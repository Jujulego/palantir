import bigDataCloud, { type BigDataCloudResult } from '@/data/sources/big-data-cloud';
import { jsonFetch } from '@/utils/fetch';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/utils/fetch');

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('bigDataCloud.rawFetchBig', () => {
  it('should not send a request for loopback or private ip address', async () => {
    await expect(bigDataCloud.rawFetch('10.0.0.1')).resolves.toStrictEqual({});
    await expect(bigDataCloud.rawFetch('127.0.0.1')).resolves.toStrictEqual({});
    await expect(bigDataCloud.rawFetch('172.16.0.1')).resolves.toStrictEqual({});
    await expect(bigDataCloud.rawFetch('192.168.1.1')).resolves.toStrictEqual({});

    expect(jsonFetch).not.toHaveBeenCalled();
  });

  it('should send a request with ip and key', async () => {
    const raw = {
      location: {
        latitude: 1,
        longitude: 2,
      }
    } as BigDataCloudResult;

    vi.mocked(jsonFetch).mockResolvedValue(raw);

    await expect(bigDataCloud.rawFetch('1.2.3.4')).resolves.toStrictEqual(raw);

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://api-bdc.net/data/ip-geolocation-full?ip=1.2.3.4&key=undefined'), {
      next: {
        revalidate: 86400,
        tags: ['1.2.3.4']
      }
    });
  });
});

describe('fetchBigDataCloud', () => {
  beforeEach(() => {
    vi.spyOn(bigDataCloud, 'rawFetch');
  });

  it('should return an empty result', async () => {
    const raw = {} as BigDataCloudResult;

    vi.mocked(bigDataCloud.rawFetch).mockResolvedValue(raw);

    await expect(bigDataCloud.fetch('1.2.3.4')).resolves.toStrictEqual({
      ip: '1.2.3.4',
      raw,
      sourceId: bigDataCloud.sourceId,
      tags: []
    });

    expect(bigDataCloud.rawFetch).toHaveBeenCalledWith('1.2.3.4');
  });

  it('should return result with coordinates', async () => {
    const raw = {
      location: {
        latitude: 1,
        longitude: 2,
      }
    } as BigDataCloudResult;

    vi.mocked(bigDataCloud.rawFetch).mockResolvedValue(raw);

    await expect(bigDataCloud.fetch('1.2.3.4')).resolves.toStrictEqual({
      coordinates: {
        latitude: 1,
        longitude: 2,
      },
      ip: '1.2.3.4',
      raw,
      sourceId: bigDataCloud.sourceId,
      tags: []
    });

    expect(bigDataCloud.rawFetch).toHaveBeenCalledWith('1.2.3.4');
  });

  it('should return result with coordinates and address', async () => {
    const raw = {
      country: {
        name: 'name',
        isoAlpha2: 'isoAlpha2',
      },
      location: {
        latitude: 1,
        longitude: 2,
        city: 'city',
        postcode: 'postcode',
        principalSubdivision: 'principalSubdivision',
      }
    } as BigDataCloudResult;

    vi.mocked(bigDataCloud.rawFetch).mockResolvedValue(raw);

    await expect(bigDataCloud.fetch('1.2.3.4')).resolves.toStrictEqual({
      address: {
        city: 'city',
        country: 'name',
        countryCode: 'isoAlpha2',
        postalCode: 'postcode',
        region: 'principalSubdivision',
      },
      coordinates: {
        latitude: 1,
        longitude: 2,
      },
      ip: '1.2.3.4',
      raw,
      sourceId: bigDataCloud.sourceId,
      tags: []
    });

    expect(bigDataCloud.rawFetch).toHaveBeenCalledWith('1.2.3.4');
  });

  it('should return result with asn', async () => {
    const raw = {
      network: {
        carriers: [
          {
            asnNumeric: 1,
            organisation: 'organisation',
          }
        ]
      }
    } as unknown as BigDataCloudResult;

    vi.mocked(bigDataCloud.rawFetch).mockResolvedValue(raw);

    await expect(bigDataCloud.fetch('1.2.3.4')).resolves.toStrictEqual({
      asn: {
        asn: 1,
        organisation: 'organisation',
      },
      ip: '1.2.3.4',
      raw,
      sourceId: bigDataCloud.sourceId,
      tags: []
    });

    expect(bigDataCloud.rawFetch).toHaveBeenCalledWith('1.2.3.4');
  });

  it('should return result with \'bogon\' tag', async () => {
    const raw = {
      network: { isBogon: true }
    } as BigDataCloudResult;

    vi.mocked(bigDataCloud.rawFetch).mockResolvedValue(raw);

    await expect(bigDataCloud.fetch('1.2.3.4')).resolves.toStrictEqual({
      ip: '1.2.3.4',
      raw,
      sourceId: bigDataCloud.sourceId,
      tags: [
        { label: 'bogon' }
      ]
    });

    expect(bigDataCloud.rawFetch).toHaveBeenCalledWith('1.2.3.4');
  });

  it.each([
    { key: 'isCellular', label: 'cellular', color: 'info' },
    { key: 'isKnownAsPublicRouter', label: 'public router', color: 'info' },
    { key: 'iCloudPrivateRelay', label: 'iCloud relay', color: 'info' },
    { key: 'isKnownAsMailServer', label: 'mail server' },
    { key: 'isKnownAsVpn', label: 'vpn', color: 'warning' },
    { key: 'isKnownAsTorServer', label: 'tor', color: 'warning' },
    { key: 'isBlacklistedBlocklistDe', label: 'blacklisted', color: 'error' },
    { key: 'isBlacklistedUceprotect', label: 'blacklisted', color: 'error' },
    { key: 'isSpamhausDrop', label: 'spamhaus', color: 'error' },
    { key: 'isSpamhausEdrop', label: 'spamhaus', color: 'error' },
    { key: 'isSpamhausAsnDrop', label: 'spamhaus', color: 'error' },
  ])('should return result with $label tag (hazard report $key)', async ({ key, ...tag }) => {
    const raw = {
      hazardReport: { [key]: true }
    } as unknown as BigDataCloudResult;

    vi.mocked(bigDataCloud.rawFetch).mockResolvedValue(raw);

    await expect(bigDataCloud.fetch('1.2.3.4')).resolves.toStrictEqual({
      ip: '1.2.3.4',
      raw,
      sourceId: bigDataCloud.sourceId,
      tags: [tag]
    });

    expect(bigDataCloud.rawFetch).toHaveBeenCalledWith('1.2.3.4');
  });
});