import { describe, expect, it } from 'vitest';
import { extractAddress, extractAutonomousSystem, extractCoordinates, extractTags } from './extractors';
import type { IpQualityScoreResult } from './ip-quality-score.dto';

// Constants
const base = {
  success: true,
  host: 'host',
  city: 'N/A',
  zip_code: 'N/A',
  region: 'N/A',
  country_code: 'N/A',
} as IpQualityScoreResult;

// Tests
describe('extractCoordinates', () => {
  it('should extract coordinates from result', () => {
    const result = {
      ...base,
      latitude: 1,
      longitude: 2,
    } as IpQualityScoreResult;

    expect(extractCoordinates(result)).toStrictEqual({
      latitude: 1,
      longitude: 2,
    });
  });

  it('should return null if location is missing', () => {
    expect(extractCoordinates(base)).toStrictEqual(null);
  });
});

describe('extractAddress', () => {
  it('should extract address from result', () => {
    const result = {
      ...base,
      city: 'city',
      zip_code: 'zip_code',
      region: 'region',
      country_code: 'fr',
    } as IpQualityScoreResult;

    expect(extractAddress(result)).toStrictEqual({
      city: 'city',
      postalCode: 'zip_code',
      region: 'region',
      country: 'France',
      countryCode: 'fr',
    });
  });

  it('should return null if location or country is missing', () => {
    expect(extractAddress(base)).toStrictEqual(null);
  });
});

describe('extractAutonomousSystem', () => {
  it('should extract autonomous system from result', () => {
    const result = {
      ...base,
      ASN: 1,
      ISP: 'ISP',
    } as IpQualityScoreResult;

    expect(extractAutonomousSystem(result)).toStrictEqual({
      asn: 1,
      organisation: 'ISP',
    });
  });

  it('should return null if network is missing', () => {
    expect(extractAutonomousSystem(base)).toStrictEqual(null);
  });
});

describe('extractTags', () => {
  it('should return no tags', () => {
    expect(extractTags(base)).toStrictEqual([]);
  });

  it.each([
    { key: 'bot_status', label: 'bot', color: 'info' },
    { key: 'is_crawler', label: 'bot', color: 'info' },
    { key: 'proxy', label: 'proxy' },
    { key: 'active_vpn', label: 'vpn', color: 'warning' },
    { key: 'vpn', label: 'vpn', color: 'warning' },
    { key: 'active_tor', label: 'tor', color: 'warning' },
    { key: 'tor', label: 'tor', color: 'warning' },
  ])('should return result with $label tag ($key)', ({ key, ...tag }) => {
    const result = {
      ...base,
      [key]: true,
    } as IpQualityScoreResult;

    expect(extractTags(result)).toStrictEqual([tag]);
  });
});
