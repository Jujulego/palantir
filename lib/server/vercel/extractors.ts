import type { Address } from '@/lib/utils/address';
import type { Coordinates } from '@/lib/utils/coordinates';
import { getName as getCountryName } from 'i18n-iso-countries';
import { headers } from 'next/headers';

/**
 * Extracts ip coordinates given by vercel threw headers
 */
export async function vercelIpCoordinates(): Promise<Coordinates | null> {
  const latitude = (await headers()).get('x-vercel-ip-latitude');
  const longitude = (await headers()).get('x-vercel-ip-longitude');

  if (latitude && longitude) {
    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
  }

  return null;
}

/**
 * Extracts address given by vercel threw headers
 */
export async function vercelIpAddress(): Promise<Address | null> {
  const city = (await headers()).get('x-vercel-ip-city');
  const countryCode = (await headers()).get('x-vercel-ip-country');

  if (city && countryCode) {
    return {
      city: city,
      country: getCountryName(countryCode, 'en') ?? '',
      countryCode,
    };
  }

  return null;
}