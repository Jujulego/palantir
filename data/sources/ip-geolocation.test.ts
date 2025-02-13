import ipGeolocation, { type IpGeolocationBogon, type IpGeolocationResult } from '@/data/sources/ip-geolocation';
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

describe('ipGeolocation.rawFetch', () => {
  it('should not send a request for loopback or private ip address', async () => {
    await expect(ipGeolocation.rawFetch('10.0.0.1')).resolves.toStrictEqual({ ip: '10.0.0.1', is_bogon: true });
    await expect(ipGeolocation.rawFetch('127.0.0.1')).resolves.toStrictEqual({ ip: '127.0.0.1', is_bogon: true });
    await expect(ipGeolocation.rawFetch('172.16.0.1')).resolves.toStrictEqual({ ip: '172.16.0.1', is_bogon: true });
    await expect(ipGeolocation.rawFetch('192.168.1.1')).resolves.toStrictEqual({ ip: '192.168.1.1', is_bogon: true });

    expect(jsonFetch).not.toHaveBeenCalled();
  });

  it('should send a request with ip and api-key', async () => {
    const raw = { ip: '1.2.3.4' } as IpGeolocationResult;

    vi.mocked(jsonFetch).mockResolvedValue(raw);

    await expect(ipGeolocation.rawFetch('1.2.3.4')).resolves.toStrictEqual(raw);

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://api.ipgeolocation.io/ipgeo?apiKey=undefined&ip=1.2.3.4'), {
      next: {
        revalidate: 86400,
        tags: ['server-1.2.3.4']
      }
    });
  });

  it('should handle bogon ip case', async () => {
    vi.mocked(jsonFetch).mockRejectedValue(new FetchError(423, ''));

    await expect(ipGeolocation.rawFetch('1.2.3.4')).resolves.toStrictEqual({
      ip: '1.2.3.4',
      is_bogon: true,
    });

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://api.ipgeolocation.io/ipgeo?apiKey=undefined&ip=1.2.3.4'), {
      next: {
        revalidate: 86400,
        tags: ['server-1.2.3.4']
      }
    });
  });

  it('should rethrow other errors', async () => {
    vi.mocked(jsonFetch).mockRejectedValue(new FetchError(500, 'Service failure'));

    await expect(ipGeolocation.rawFetch('1.2.3.4')).rejects.toStrictEqual(new FetchError(500, 'Service failure'));

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://api.ipgeolocation.io/ipgeo?apiKey=undefined&ip=1.2.3.4'), {
      next: {
        revalidate: 86400,
        tags: ['server-1.2.3.4']
      }
    });
  });
});

describe('ipGeolocation.fetch', () => {
  const result = {
    ip: '1.2.3.4',
    hostname: 'hostname',
    latitude: '1',
    longitude: '2',
    city: 'city',
    zipcode: 'zipcode',
    state_prov: 'state_prov',
    country_name: 'country_name',
    country_code2: 'country_code2',
  } as IpGeolocationResult;

  beforeEach(() => {
    vi.spyOn(ipGeolocation, 'rawFetch');
  });

  it('should handle bogon payload', async () => {
    const raw = { ip: '1.2.3.4', is_bogon: true } as IpGeolocationBogon;

    vi.mocked(ipGeolocation.rawFetch).mockResolvedValue(raw);

    await expect(ipGeolocation.fetch('1.2.3.4')).resolves.toStrictEqual({
      ip: '1.2.3.4',
      raw,
      sourceId: ipGeolocation.sourceId,
      tags: [{ label: 'bogon' }],
    });
  });

  it('should return result with only coordinates, address & hostname', async () => {
    const raw = { ...result };

    vi.mocked(ipGeolocation.rawFetch).mockResolvedValue(raw);

    await expect(ipGeolocation.fetch('1.2.3.4')).resolves.toStrictEqual({
      address: {
        city: 'city',
        postalCode: 'zipcode',
        region: 'state_prov',
        country: 'country_name',
        countryCode: 'country_code2',
      },
      coordinates: {
        latitude: 1,
        longitude: 2
      },
      ip: '1.2.3.4',
      hostname: 'hostname',
      raw,
      sourceId: ipGeolocation.sourceId,
      tags: [],
    });
  });

  it('should return result with asn', async () => {
    const raw = {
      ...result,
      asn: 'AS1',
      organization: 'organization',
    };

    vi.mocked(ipGeolocation.rawFetch).mockResolvedValue(raw);

    await expect(ipGeolocation.fetch('1.2.3.4')).resolves.toStrictEqual({
      address: {
        city: 'city',
        postalCode: 'zipcode',
        region: 'state_prov',
        country: 'country_name',
        countryCode: 'country_code2',
      },
      asn: {
        asn: 1,
        organisation: 'organization',
      },
      coordinates: {
        latitude: 1,
        longitude: 2
      },
      ip: '1.2.3.4',
      hostname: 'hostname',
      raw,
      sourceId: ipGeolocation.sourceId,
      tags: [],
    });
  });

  it('should return result with connection type as tag', async () => {
    const raw = {
      ...result,
      connection_type: 'connection_type',
    };

    vi.mocked(ipGeolocation.rawFetch).mockResolvedValue(raw);

    await expect(ipGeolocation.fetch('1.2.3.4')).resolves.toStrictEqual({
      address: {
        city: 'city',
        postalCode: 'zipcode',
        region: 'state_prov',
        country: 'country_name',
        countryCode: 'country_code2',
      },
      coordinates: {
        latitude: 1,
        longitude: 2
      },
      ip: '1.2.3.4',
      hostname: 'hostname',
      raw,
      sourceId: ipGeolocation.sourceId,
      tags: [{ label: 'connection_type' }],
    });
  });
});
