import type { AutonomousSystem } from '@/lib/server/autonomous-system';
import type { IpInfoData } from '@/lib/server/ip-info/ip-info.dto';
import type { Address } from '@/lib/utils/address';
import type { Coordinates } from '@/lib/utils/coordinates';
import { getName as getCountryName } from 'i18n-iso-countries';

/**
 * Extracts location from an IPinfo query result
 * @param result
 */
export function extractCoordinates(result: IpInfoData): Coordinates {
  const [latitude, longitude] = result.loc.split(',');

  return {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  };
}

/**
 * Extracts address from an IPinfo query result
 * @param result
 */
export function extractAddress(result: IpInfoData): Address {
  return {
    city: result.city,
    postalCode: result.postal,
    region: result.region,
    country: getCountryName(result.country, 'en') ?? '',
    countryCode: result.country,
  };
}

/**
 * Extracts autonomous system from an IPinfo query result
 * @param result
 */
export function extractAutonomousSystem(result: IpInfoData): AutonomousSystem | null {
  if (result.org) {
    const idx = result.org.indexOf(' ');

    return {
      asn: parseInt(result.org.slice(2, idx), 10),
      organisation: result.org.slice(idx + 1),
    };
  }

  return null;
}
