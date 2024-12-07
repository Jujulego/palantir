import ipQualityScore, { type IpQualityResult } from '@/data/sources/ip-quality-score';
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

describe('ipQualityScore.rawFetch', () => {
  it('should send a request with ip and api key', async () => {
    const raw = { success: true } as IpQualityResult;

    vi.mocked(jsonFetch).mockResolvedValue(raw);

    await expect(ipQualityScore.rawFetch('1.2.3.4')).resolves.toStrictEqual(raw);

    expect(jsonFetch).toHaveBeenCalledWith(new URL('https://ipqualityscore.com/api/json/ip?ip=1.2.3.4'), {
      headers: {
        'IPQS-KEY': undefined,
      },
      next: {
        revalidate: 86400,
        tags: ['1.2.3.4']
      }
    });
  });
});

describe('ipQualityScore.fetch', () => {
  const result = {
    success: true,
    host: 'host',
    city: 'N/A',
    zip_code: 'N/A',
    region: 'N/A',
    country_code: 'N/A',
  } as IpQualityResult;

  beforeEach(() => {
    vi.spyOn(ipQualityScore, 'rawFetch');
  });

  it('should failure payload', async () => {
    const raw = { success: false } as IpQualityResult;

    vi.mocked(ipQualityScore.rawFetch).mockResolvedValue(raw);

    await expect(ipQualityScore.fetch('1.2.3.4')).resolves.toStrictEqual({
      ip: '1.2.3.4',
      raw,
      sourceId: ipQualityScore.sourceId,
      tags: [],
    });
  });

  it('should return result with only hostname', async () => {
    const raw = { ...result };

    vi.mocked(ipQualityScore.rawFetch).mockResolvedValue(raw);

    await expect(ipQualityScore.fetch('1.2.3.4')).resolves.toStrictEqual({
      ip: '1.2.3.4',
      hostname: 'host',
      raw,
      sourceId: ipQualityScore.sourceId,
      tags: [],
    });
  });

  it('should return result with coordinates', async () => {
    const raw = {
      ...result,
      latitude: 1,
      longitude: 2,
    };

    vi.mocked(ipQualityScore.rawFetch).mockResolvedValue(raw);

    await expect(ipQualityScore.fetch('1.2.3.4')).resolves.toStrictEqual({
      coordinates: {
        latitude: 1,
        longitude: 2
      },
      ip: '1.2.3.4',
      hostname: 'host',
      raw,
      sourceId: ipQualityScore.sourceId,
      tags: [],
    });
  });

  it('should return result with address', async () => {
    const raw = {
      ...result,
      city: 'city',
      zip_code: 'zip_code',
      region: 'region',
      country_code: 'fr',
    };

    vi.mocked(ipQualityScore.rawFetch).mockResolvedValue(raw);

    await expect(ipQualityScore.fetch('1.2.3.4')).resolves.toStrictEqual({
      address: {
        city: 'city',
        postalCode: 'zip_code',
        region: 'region',
        country: 'France',
        countryCode: 'fr',
      },
      ip: '1.2.3.4',
      hostname: 'host',
      raw,
      sourceId: ipQualityScore.sourceId,
      tags: [],
    });
  });

  it('should return result with asn', async () => {
    const raw = {
      ...result,
      ASN: 1,
      ISP: 'ISP',
    };

    vi.mocked(ipQualityScore.rawFetch).mockResolvedValue(raw);

    await expect(ipQualityScore.fetch('1.2.3.4')).resolves.toStrictEqual({
      asn: {
        asn: 1,
        organisation: 'ISP',
      },
      ip: '1.2.3.4',
      hostname: 'host',
      raw,
      sourceId: ipQualityScore.sourceId,
      tags: [],
    });
  });

  it.each([
    { key: 'bot_status', label: 'bot', color: 'info' },
    { key: 'is_crawler', label: 'bot', color: 'info' },
    { key: 'proxy', label: 'proxy' },
    { key: 'active_vpn', label: 'vpn', color: 'warning' },
    { key: 'vpn', label: 'vpn', color: 'warning' },
    { key: 'active_tor', label: 'tor', color: 'warning' },
    { key: 'tor', label: 'tor', color: 'warning' },
  ])('should return result with $label tag ($key)', async ({ key, ...tag }) => {
    const raw = {
      ...result,
      [key]: true,
    };

    vi.mocked(ipQualityScore.rawFetch).mockResolvedValue(raw);

    await expect(ipQualityScore.fetch('1.2.3.4')).resolves.toStrictEqual({
      ip: '1.2.3.4',
      hostname: 'host',
      raw,
      sourceId: ipQualityScore.sourceId,
      tags: [tag],
    });
  });
});
