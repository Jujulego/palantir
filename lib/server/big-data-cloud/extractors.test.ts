import { describe, expect, it } from 'vitest';
import { extractAddress, extractAutonomousSystem, extractCoordinates, extractTags } from './extractors';
import type { BigDataCloudHazardReport, IpGeolocationFullResult, BigDataCloudNetwork, BigDataCloudNetworkCarrier } from './ip-geolocation.dto';

// Tests
describe('extractCoordinates', () => {
  it('should extract coordinates from result', () => {
    const result = {
      location: {
        latitude: 1,
        longitude: 2,
      }
    } as IpGeolocationFullResult;

    expect(extractCoordinates(result)).toStrictEqual({
      latitude: 1,
      longitude: 2,
    });
  });

  it('should return null if location is missing', () => {
    expect(extractCoordinates({})).toStrictEqual(null);
  });
});

describe('extractAddress', () => {
  it('should extract address from result', () => {
    const result = {
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
    } as IpGeolocationFullResult;

    expect(extractAddress(result)).toStrictEqual({
      city: 'city',
      country: 'name',
      countryCode: 'isoAlpha2',
      postalCode: 'postcode',
      region: 'principalSubdivision',
    });
  });

  it('should return null if location or country is missing', () => {
    expect(extractAddress({})).toStrictEqual(null);
  });
});

describe('extractAutonomousSystem', () => {
  it('should extract autonomous system from result', () => {
    const result = {
      network: {
        carriers: [
          {
            asnNumeric: 1,
            organisation: 'organisation',
          } as BigDataCloudNetworkCarrier,
        ] as readonly BigDataCloudNetworkCarrier[]
      } as BigDataCloudNetwork
    } as IpGeolocationFullResult;

    expect(extractAutonomousSystem(result)).toStrictEqual({
      asn: 1,
      organisation: 'organisation',
    });
  });

  it('should return null if network is missing', () => {
    expect(extractAutonomousSystem({})).toStrictEqual(null);
  });
});

describe('extractTags', () => {
  it('should return no tags', () => {
    expect(extractTags({})).toStrictEqual([]);
  });

  it('should return result with \'bogon\' tag', () => {
    const result = {
      network: { isBogon: true }
    } as IpGeolocationFullResult;

    expect(extractTags(result)).toStrictEqual([
      { label: 'bogon' }
    ]);
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
  ])('should return result with $label tag (hazard report $key)', ({ key, ...tag }) => {
    const result = {
      hazardReport: { [key]: true } as unknown as BigDataCloudHazardReport,
    };

    expect(extractTags(result)).toStrictEqual([tag]);
  });
});
