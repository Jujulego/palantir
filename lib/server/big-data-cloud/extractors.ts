import type { IpGeolocationFullResult } from '@/lib/server/big-data-cloud/ip-geolocation.dto';
import type { Location } from '@/lib/utils/location';

/**
 * Extracts location from a Big Data Cloud geolocation result
 * @param result
 */
export function extractLocation(result: IpGeolocationFullResult): Location | null {
  if (result.location) {
    return {
      latitude: result.location.latitude,
      longitude: result.location.longitude,
    };
  }

  return null;
}