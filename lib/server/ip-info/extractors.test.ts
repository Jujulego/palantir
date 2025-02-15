import { describe, expect, it } from 'vitest';
import { extractAddress, extractAutonomousSystem, extractCoordinates } from './extractors';
import type { IpInfoResult } from './ip-info.dto';

// Constants
const result = {
  ip: '1.2.3.4',
  hostname: 'hostname',
  loc: '1,2',
  city: 'city',
  postal: 'postal',
  region: 'region',
  country: 'fr',
  anycast: false,
} as IpInfoResult;

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
      country: 'France',
      countryCode: 'fr',
      postalCode: 'postal',
      region: 'region',
    });
  });
});

describe('extractAutonomousSystem', () => {
  it('should extract autonomous system from result', () => {
    expect(extractAutonomousSystem({ ...result, org: 'AS1 organisation' })).toStrictEqual({
      asn: 1,
      organisation: 'organisation',
    });
  });

  it('should return null if org is missing', () => {
    expect(extractAutonomousSystem(result)).toStrictEqual(null);
  });
});
