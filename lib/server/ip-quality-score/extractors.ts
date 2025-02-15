import type { AutonomousSystem } from '@/lib/server/autonomous-system';
import type { Address } from '@/lib/utils/address';
import type { Coordinates } from '@/lib/utils/coordinates';
import type { Tag } from '@/lib/utils/tag';
import { getName as getCountryName } from 'i18n-iso-countries';
import type { IpQualityScoreResult } from './ip-quality-score.dto';

/**
 * Extracts location from an IPQS result
 * @param result
 */
export function extractCoordinates(result: IpQualityScoreResult): Coordinates | null {
  if (result.success && result.latitude && result.longitude) {
    return {
      latitude: result.latitude,
      longitude: result.longitude,
    };
  }

  return null;
}

/**
 * Extracts address from an IPQS result
 * @param result
 */
export function extractAddress(result: IpQualityScoreResult): Address | null {
  if (result.success && result.country_code !== 'N/A') {
    return {
      city: removeNA(result.city),
      postalCode: removeNA(result.zip_code),
      region: removeNA(result.region),
      country: getCountryName(result.country_code, 'en') ?? '',
      countryCode: result.country_code
    };
  }

  return null;
}

/**
 * Extracts autonomous system from an IPQS result
 * @param result
 */
export function extractAutonomousSystem(result: IpQualityScoreResult): AutonomousSystem | null {
  if (result.success && result.ASN) {
    return {
      asn: result.ASN,
      organisation: result.ISP,
    };
  }

  return null;
}

/**
 * Extracts tags from an IPQS result
 * @param result
 */
export function extractTags(result: IpQualityScoreResult): Tag[] {
  const tags: Tag[] = [];

  if (result.success) {
    if (result.bot_status || result.is_crawler) {
      tags.push({ label: 'bot', color: 'info' });
    }

    if (result.proxy) {
      tags.push({ label: 'proxy' });
    }

    if (result.active_vpn || result.vpn) {
      tags.push({ label: 'vpn', color: 'warning' });
    }

    if (result.active_tor || result.tor) {
      tags.push({ label: 'tor', color: 'warning' });
    }
  }

  return tags;
}

// Utils
function removeNA(value: string): string | undefined {
  return value !== 'N/A' ? value : undefined;
}
