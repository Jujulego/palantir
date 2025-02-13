import { describe, expect, it } from 'vitest';
import { extractAddress, extractAutonomousSystem, extractCoordinates, extractTags } from './extractors';
import type { IpDataResult, IpDataThreat } from './ip-data.dto';

// Constants
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

// Tests
describe('extractCoordinates', () => {
  it('should extract coordinates from result', () => {
    expect(extractCoordinates(result)).toStrictEqual({
      latitude: 1,
      longitude: 2,
    });
  });
});

describe('extractAddress', () => {
  it('should extract address from result', () => {
    expect(extractAddress(result)).toStrictEqual({
      city: 'city',
      country: 'country_name',
      countryCode: 'country_code',
      postalCode: 'postal',
      region: 'region',
    });
  });
});

describe('extractAutonomousSystem', () => {
  it('should extract autonomous system from result', () => {
    const payload = {
      ...result,
      asn: {
        asn: 'AS1',
        name: 'name',
        domain: 'domain',
        route: 'route',
        type: 'type',
      }
    };

    expect(extractAutonomousSystem(payload)).toStrictEqual({
      asn: 1,
      organisation: 'name',
    });
  });

  it('should return null if asn is missing', () => {
    expect(extractAutonomousSystem(result)).toStrictEqual(null);
  });
});

describe('extractTags', () => {
  it('should return no tags', () => {
    expect(extractTags(result)).toStrictEqual([]);
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
  ])('should return result with $label tag (hazard report $key)', ({ key, ...tag }) => {
    const payload = {
      ...result,
      threat: { [key]: true } as unknown as IpDataThreat,
    };

    expect(extractTags(payload)).toStrictEqual([tag]);
  });
});
