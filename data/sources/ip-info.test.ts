import ipInfo, { type IpInfoBogon, type IpInfoResult } from '@/data/sources/ip-info';
import { jsonFetch } from '@/utils/fetch';
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

describe('ipInfo.rawFetch', () => {
  it('should not send a request for loopback or private ip address', async () => {
    await expect(ipInfo.rawFetch('10.0.0.1')).resolves.toStrictEqual({ ip: '10.0.0.1', bogon: true });
    await expect(ipInfo.rawFetch('127.0.0.1')).resolves.toStrictEqual({ ip: '127.0.0.1', bogon: true });
    await expect(ipInfo.rawFetch('172.16.0.1')).resolves.toStrictEqual({ ip: '172.16.0.1', bogon: true });
    await expect(ipInfo.rawFetch('192.168.1.1')).resolves.toStrictEqual({ ip: '192.168.1.1', bogon: true });

    expect(jsonFetch).not.toHaveBeenCalled();
  });

  it('should send a request with ip and api-key', async () => {
    const raw = { ip: '1.2.3.4' } as IpInfoResult;

    vi.mocked(jsonFetch).mockResolvedValue(raw);

    await expect(ipInfo.rawFetch('1.2.3.4')).resolves.toStrictEqual(raw);

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://ipinfo.io/1.2.3.4/json'), {
      headers: {
        Authorization: 'Bearer undefined'
      },
      next: {
        revalidate: 86400,
        tags: ['1.2.3.4']
      }
    });
  });
});

describe('ipInfo.fetch', () => {
  const result = {
    ip: '1.2.3.4',
    hostname: 'hostname',
    loc: '1,2',
    city: 'city',
    postal: 'postal',
    region: 'region',
    country: 'fr',
    bogon: false,
  } as IpInfoResult;

  beforeEach(() => {
    vi.spyOn(ipInfo, 'rawFetch');
  });

  it('should handle bogon payload', async () => {
    const raw = { ip: '1.2.3.4', bogon: true } as IpInfoBogon;

    vi.mocked(ipInfo.rawFetch).mockResolvedValue(raw);

    await expect(ipInfo.fetch('1.2.3.4')).resolves.toStrictEqual({
      ip: '1.2.3.4',
      raw,
      sourceId: ipInfo.sourceId,
      tags: [{ label: 'bogon' }],
    });
  });

  it('should return result with only coordinates, address & hostname', async () => {
    const raw = { ...result };

    vi.mocked(ipInfo.rawFetch).mockResolvedValue(raw);

    await ipInfo.fetch('1.2.3.4');
    await expect(ipInfo.fetch('1.2.3.4')).resolves.toStrictEqual({
      address: {
        city: 'city',
        postalCode: 'postal',
        region: 'region',
        country: 'France',
        countryCode: 'fr',
      },
      coordinates: {
        latitude: 1,
        longitude: 2
      },
      ip: '1.2.3.4',
      hostname: 'hostname',
      raw,
      sourceId: ipInfo.sourceId,
      tags: [],
    });
  });

  it('should return result with asn', async () => {
    const raw = {
      ...result,
      org: 'AS1 organization',
    };

    vi.mocked(ipInfo.rawFetch).mockResolvedValue(raw);

    await ipInfo.fetch('1.2.3.4');
    await expect(ipInfo.fetch('1.2.3.4')).resolves.toStrictEqual({
      address: {
        city: 'city',
        postalCode: 'postal',
        region: 'region',
        country: 'France',
        countryCode: 'fr',
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
      sourceId: ipInfo.sourceId,
      tags: [],
    });
  });
});
