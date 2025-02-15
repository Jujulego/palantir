import type { AutonomousSystem } from '@/lib/server/autonomous-system';
import type { IpGeolocationResult } from './ip-geolocation.dto';
import type { Address } from '@/lib/utils/address';
import type { Coordinates } from '@/lib/utils/coordinates';
import type { Tag } from '@/lib/utils/tag';

/**
 * Extracts location from an ipgeolocation geolocation result
 * @param result
 */
export function extractCoordinates(result: IpGeolocationResult): Coordinates {
  return {
    latitude: parseFloat(result.latitude),
    longitude: parseFloat(result.longitude),
  };
}

/**
 * Extracts address from an ipgeolocation geolocation result
 * @param result
 */
export function extractAddress(result: IpGeolocationResult): Address {
  return {
    city: result.city,
    country: result.country_name,
    countryCode: result.country_code2,
    postalCode: result.zipcode,
    region: result.state_prov,
  };
}

/**
 * Extracts autonomous system from an ipgeolocation geolocation result
 * @param result
 */
export function extractAutonomousSystem(result: IpGeolocationResult): AutonomousSystem | null {
  if (result.asn && result.organization) {
    return {
      asn: parseInt(result.asn.slice(2), 10),
      organisation: result.organization,
    };
  }

  return null;
}

/**
 * Extracts tags from an ipgeolocation geolocation result
 * @param result
 */
export function extractTags(result: IpGeolocationResult): Tag[] {
  const tags: Tag[] = [];

  if (result.connection_type) {
    tags.push({ label: result.connection_type });
  }

  return tags;
}
