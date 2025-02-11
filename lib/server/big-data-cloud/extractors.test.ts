import { describe, expect, it } from 'vitest';
import { extractAddress, extractCoordinates } from './extractors';
import type { IpGeolocationFullResult } from './ip-geolocation.dto';

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

  it('should return null if location is missing', () => {
    expect(extractAddress({})).toStrictEqual(null);
  });
});