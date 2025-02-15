import { describe, expect, it } from 'vitest';
import { extractAddress, extractAutonomousSystem, extractCoordinates, extractTags } from './extractors';
import type { IpGeolocationResult } from './ip-geolocation.dto';

// Constants
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
      countryCode: 'country_code2',
      postalCode: 'zipcode',
      region: 'state_prov',
    });
  });
});

describe('extractAutonomousSystem', () => {
  it('should extract autonomous system from result', () => {
    const payload = {
      ...result,
      asn: 'AS1',
      organization: 'organisation',
    };

    expect(extractAutonomousSystem(payload)).toStrictEqual({
      asn: 1,
      organisation: 'organisation',
    });
  });

  it('should return null if network is missing', () => {
    expect(extractAutonomousSystem(result)).toStrictEqual(null);
  });
});

describe('extractTags', () => {
  it('should return no tags', () => {
    expect(extractTags(result)).toStrictEqual([]);
  });

  it('should return connection_type as tag', () => {
    const payload = {
      ...result,
      connection_type: 'connection_type',
    };

    expect(extractTags(payload)).toStrictEqual([{ label: 'connection_type' }]);
  });
});
