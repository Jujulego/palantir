import type { AutonomousSystem } from '@/lib/server/autonomous-system';
import type { Address } from '@/lib/utils/address';
import type { Coordinates } from '@/lib/utils/coordinates';
import type { Tag } from '@/lib/utils/tag';
import type { IpDataResult } from './ip-data.dto';

/**
 * Extracts location from an ipdata result
 * @param result
 */
export function extractCoordinates(result: IpDataResult): Coordinates {
  return {
    latitude: result.latitude,
    longitude: result.longitude,
  };
}

/**
 * Extracts address from an ipdata result
 * @param result
 */
export function extractAddress(result: IpDataResult): Address {
  return {
    city: result.city,
    country: result.country_name,
    countryCode: result.country_code,
    postalCode: result.postal,
    region: result.region,
  };
}

/**
 * Extracts autonomous system from an ipdata result
 * @param result
 */
export function extractAutonomousSystem(result: IpDataResult): AutonomousSystem | null {
  if (result.asn) {
    return {
      asn: parseInt(result.asn.asn.slice(2), 10),
      organisation: result.asn.name,
    };
  }

  return null;
}

/**
 * Extracts tags from an ipdata result
 * @param result
 */
export function extractTags(result: IpDataResult): Tag[] {
  const tags: Tag[] = [];

  if (result.threat.is_bogon) {
    tags.push({ label: 'bogon' });
  }

  if (result.threat.is_datacenter) {
    tags.push({ label: 'datacenter', color: 'info' });
  }

  if (result.threat.is_icloud_relay) {
    tags.push({ label: 'iCloud relay', color: 'info' });
  }

  if (result.threat.is_proxy) {
    tags.push({ label: 'proxy' });
  }

  if (result.threat.is_vpn) {
    tags.push({ label: 'vpn', color: 'warning' });
  }

  if (result.threat.is_tor) {
    tags.push({ label: 'tor', color: 'warning' });
  }

  if (result.threat.is_known_attacker) {
    tags.push({ label: 'attacker', color: 'error' });
  }

  if (result.threat.is_known_abuser) {
    tags.push({ label: 'abuser', color: 'error' });
  }

  return tags;
}
