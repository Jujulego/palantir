import type { AutonomousSystem } from '@/lib/server/autonomous-system';
import type { IpGeolocationFullResult } from '@/lib/server/big-data-cloud/ip-geolocation.dto';
import type { Address } from '@/lib/utils/address';
import type { Coordinates } from '@/lib/utils/coordinates';

/**
 * Extracts location from a Big Data Cloud geolocation result
 * @param result
 */
export function extractCoordinates(result: IpGeolocationFullResult): Coordinates | null {
  if (result.location) {
    return {
      latitude: result.location.latitude,
      longitude: result.location.longitude,
    };
  }

  return null;
}

/**
 * Extracts address from a Big Data Cloud geolocation result
 * @param result
 */
export function extractAddress(result: IpGeolocationFullResult): Address | null {
  if (result.location && result.country) {
    return {
      city: result.location.city,
      postalCode: result.location.postcode,
      region: result.location.principalSubdivision,
      country: result.country.name,
      countryCode: result.country.isoAlpha2,
    };
  }

  return null;
}
/**
 * Extracts autonomous system from a Big Data Cloud geolocation result
 * @param result
 */
export function extractAutonomousSystem(result: IpGeolocationFullResult): AutonomousSystem | null {
  if (result.network?.carriers?.length) {
    return {
      asn: result.network.carriers[0].asnNumeric,
      organisation: result.network.carriers[0].organisation,
    };
  }

  return null;
}
