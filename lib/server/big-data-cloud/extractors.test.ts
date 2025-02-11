import { describe, expect, it } from 'vitest';
import { extractLocation } from './extractors';
import type { IpGeolocationFullResult } from './ip-geolocation.dto';

describe('extractLocation', () => {
  it('should extract location from result', () => {
    const result = {
      location: {
        latitude: 1,
        longitude: 2,
      }
    } as IpGeolocationFullResult;

    expect(extractLocation(result)).toStrictEqual({
      latitude: 1,
      longitude: 2,
    });
  });

  it('should return null if location is missing', () => {
    expect(extractLocation({})).toStrictEqual(null);
  });
});