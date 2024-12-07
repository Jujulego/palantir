import ipData, { type IpDataBogon, type IpDataResult, type IpDataThreat } from '@/data/sources/ip-data';
import { FetchError, jsonFetch } from '@/utils/fetch';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/utils/fetch', (importOriginal) =>
  importOriginal<typeof import('@/utils/fetch')>().then((mod) => ({
    ...mod,
    jsonFetch: vi.fn(),
  }))
);

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('ipData.rawFetch', () => {
  it('should not send a request for loopback or private ip address', async () => {
    await expect(ipData.rawFetch('10.0.0.1')).resolves.toStrictEqual({ ip: '10.0.0.1', is_bogon: true });
    await expect(ipData.rawFetch('127.0.0.1')).resolves.toStrictEqual({ ip: '127.0.0.1', is_bogon: true });
    await expect(ipData.rawFetch('172.16.0.1')).resolves.toStrictEqual({ ip: '172.16.0.1', is_bogon: true });
    await expect(ipData.rawFetch('192.168.1.1')).resolves.toStrictEqual({ ip: '192.168.1.1', is_bogon: true });

    expect(jsonFetch).not.toHaveBeenCalled();
  });

  it('should send a request with ip and api-key', async () => {
    const raw = { ip: '1.2.3.4' } as IpDataResult;

    vi.mocked(jsonFetch).mockResolvedValue(raw);

    await expect(ipData.rawFetch('1.2.3.4')).resolves.toStrictEqual(raw);

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://eu-api.ipdata.co/1.2.3.4?api-key=undefined'), {
      next: {
        revalidate: 86400,
        tags: ['1.2.3.4']
      }
    });
  });

  it('should handle reserved ip case', async () => {
    vi.mocked(jsonFetch).mockRejectedValue(new FetchError(400, JSON.stringify({
      message: '1.2.3.4 is a reserved IP address.',
    })));

    await expect(ipData.rawFetch('1.2.3.4')).resolves.toStrictEqual({
      ip: '1.2.3.4',
      is_bogon: true,
    });

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://eu-api.ipdata.co/1.2.3.4?api-key=undefined'), {
      next: {
        revalidate: 86400,
        tags: ['1.2.3.4']
      }
    });
  });

  it('should handle private ip case', async () => {
    vi.mocked(jsonFetch).mockRejectedValue(new FetchError(400, JSON.stringify({
      message: '1.2.3.4 is a private IP address.',
    })));

    await expect(ipData.rawFetch('1.2.3.4')).resolves.toStrictEqual({
      ip: '1.2.3.4',
      is_bogon: true,
    });

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://eu-api.ipdata.co/1.2.3.4?api-key=undefined'), {
      next: {
        revalidate: 86400,
        tags: ['1.2.3.4']
      }
    });
  });

  it('should rethrow other errors', async () => {
    vi.mocked(jsonFetch).mockRejectedValue(new FetchError(500, 'Service failure'));

    await expect(ipData.rawFetch('1.2.3.4')).rejects.toStrictEqual(new FetchError(500, 'Service failure'));

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://eu-api.ipdata.co/1.2.3.4?api-key=undefined'), {
      next: {
        revalidate: 86400,
        tags: ['1.2.3.4']
      }
    });
  });
});

describe('ipData.fetch', () => {
  const result = {
    ip: '1.2.3.4',
    latitude: 1,
    longitude: 2,
    city: 'city',
    postal: 'postal',
    region: 'region',
    country_name: 'country_name',
    country_code: 'country_code',
    threat: {
      is_bogon: false,
      is_datacenter: false,
      is_icloud_relay: false,
      is_proxy: false,
      is_vpn: false,
      is_tor: false,
      is_known_attacker: false,
      is_known_abuser: false,
      is_anonymous: false,
      is_threat: false,
      blocklists: []
    } as IpDataThreat
  } as IpDataResult;

  beforeEach(() => {
    vi.spyOn(ipData, 'rawFetch');
  });

  it('should handle bogon payload', async () => {
    const raw = { ip: '1.2.3.4', is_bogon: true } as IpDataBogon;

    vi.mocked(ipData.rawFetch).mockResolvedValue(raw);

    await expect(ipData.fetch('1.2.3.4')).resolves.toStrictEqual({
      ip: '1.2.3.4',
      raw,
      sourceId: ipData.sourceId,
      tags: [{ label: 'bogon' }],
    });
  });

  it('should return result with only coordinates & address', async () => {
    const raw = { ...result };

    vi.mocked(ipData.rawFetch).mockResolvedValue(raw);

    await expect(ipData.fetch('1.2.3.4')).resolves.toStrictEqual({
      address: {
        city: 'city',
        postalCode: 'postal',
        region: 'region',
        country: 'country_name',
        countryCode: 'country_code',
      },
      coordinates: {
        latitude: 1,
        longitude: 2
      },
      ip: '1.2.3.4',
      raw,
      sourceId: ipData.sourceId,
      tags: [],
    });
  });

  it('should return result with asn', async () => {
    const raw = {
      ...result,
      asn: {
        asn: 'AS1',
        name: 'name',
        domain: 'domain',
        route: 'route',
        type: 'type',
      }
    };

    vi.mocked(ipData.rawFetch).mockResolvedValue(raw);

    await expect(ipData.fetch('1.2.3.4')).resolves.toStrictEqual({
      address: {
        city: 'city',
        postalCode: 'postal',
        region: 'region',
        country: 'country_name',
        countryCode: 'country_code',
      },
      asn: {
        asn: 1,
        organisation: 'name',
      },
      coordinates: {
        latitude: 1,
        longitude: 2
      },
      ip: '1.2.3.4',
      raw,
      sourceId: ipData.sourceId,
      tags: [],
    });
  });

  it.each([
    { key: 'is_bogon', label: 'bogon' },
    { key: 'is_datacenter', label: 'datacenter', color: 'info' },
    { key: 'is_icloud_relay', label: 'iCloud relay', color: 'info' },
    { key: 'is_proxy', label: 'proxy' },
    { key: 'is_vpn', label: 'vpn', color: 'warning' },
    { key: 'is_tor', label: 'tor', color: 'warning' },
    { key: 'is_known_attacker', label: 'attacker', color: 'error' },
    { key: 'is_known_abuser', label: 'abuser', color: 'error' },
  ])('should return result with $label tag ($key)', async ({ key, ...tag }) => {
    const raw = {
      ...result,
      threat: {
        ...result.threat,
        [key]: true,
      }
    };

    vi.mocked(ipData.rawFetch).mockResolvedValue(raw);

    await expect(ipData.fetch('1.2.3.4')).resolves.toStrictEqual({
      address: {
        city: 'city',
        postalCode: 'postal',
        region: 'region',
        country: 'country_name',
        countryCode: 'country_code',
      },
      coordinates: {
        latitude: 1,
        longitude: 2
      },
      ip: '1.2.3.4',
      raw,
      sourceId: ipData.sourceId,
      tags: [tag],
    });
  });
});
