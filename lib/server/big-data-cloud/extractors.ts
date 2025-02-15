import type { AutonomousSystem } from '@/lib/server/autonomous-system';
import type { Address } from '@/lib/utils/address';
import type { Coordinates } from '@/lib/utils/coordinates';
import type { Tag } from '@/lib/utils/tag';
import type { IpGeolocationFullResult } from './ip-geolocation.dto';

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

/**
 * Extracts tags from a Big Data Cloud geolocation result
 * @param result
 */
export function extractTags(result: IpGeolocationFullResult): Tag[] {
  const tags: Tag[] = [];

  if (result.hazardReport?.isCellular) {
    tags.push({ label: 'cellular', color: 'info' });
  }

  if (result.hazardReport?.isKnownAsPublicRouter) {
    tags.push({ label: 'public router', color: 'info' });
  }

  if (result.hazardReport?.iCloudPrivateRelay) {
    tags.push({ label: 'iCloud relay', color: 'info' });
  }

  if (result.network?.isBogon) {
    tags.push({ label: 'bogon' });
  }

  if (result.hazardReport?.isKnownAsMailServer) {
    tags.push({ label: 'mail server' });
  }

  if (result.hazardReport?.isKnownAsVpn) {
    tags.push({ label: 'vpn', color: 'warning' });
  }

  if (result.hazardReport?.isKnownAsTorServer) {
    tags.push({ label: 'tor', color: 'warning' });
  }

  if (result.hazardReport?.isBlacklistedBlocklistDe || result.hazardReport?.isBlacklistedUceprotect) {
    tags.push({ label: 'blacklisted', color: 'error' });
  }

  if (result.hazardReport?.isSpamhausDrop || result.hazardReport?.isSpamhausEdrop || result.hazardReport?.isSpamhausAsnDrop) {
    tags.push({ label: 'spamhaus', color: 'error' });
  }

  return tags;
}
