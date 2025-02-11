import type { IpMetadata } from '@/data/ip-metadata';
import type { Tag } from '@/lib/utils/tag';
import { jsonFetch } from '@/utils/fetch';
import countries from 'i18n-iso-countries';
import ipaddr from 'ipaddr.js';

// Types
interface IpQualityBase {
  readonly request_id: string;
  readonly success: boolean;
  readonly message: string;
  readonly errors: string[];
}

export interface IpQualitySuccess extends IpQualityBase {
  readonly success: true;
  readonly fraud_score: number;
  readonly country_code: string;
  readonly region: string;
  readonly city: string;
  readonly ISP: string;
  readonly ASN?: number;
  readonly organization: string;
  readonly is_crawler: boolean;
  readonly timezone: string;
  readonly mobile: boolean;
  readonly host: string;
  readonly proxy: boolean;
  readonly vpn: boolean;
  readonly tor: boolean;
  readonly active_vpn: boolean;
  readonly active_tor: boolean;
  readonly recent_abuse: boolean;
  readonly bot_status: boolean;
  readonly connection_type: string;
  readonly abuse_velocity: string;
  readonly zip_code: string;
  readonly latitude?: number;
  readonly longitude?: number;
}

export interface IpQualityError extends IpQualityBase {
  readonly success: false;
}

export type IpQualityResult = IpQualitySuccess | IpQualityError;

// Service
export const ipQualityScoreColor = '#f43a3a';
export const ipQualityScoreSourceId = 'ip-quality-score' as const;

const ipQualityScore = {
  name: 'IPQS',
  color: ipQualityScoreColor,
  sourceId: ipQualityScoreSourceId,
  async rawFetch(ip: string): Promise<IpQualityResult> {
    const parsed = ipaddr.parse(ip);

    // Make request
    console.log(`Fetching ${ipQualityScoreSourceId} for ${parsed.toNormalizedString()}`);
    const url = new URL('https://ipqualityscore.com/api/json/ip');
    url.searchParams.set('ip', parsed.toNormalizedString());

    const res = await jsonFetch<IpQualityResult>(url, {
      headers: {
        'IPQS-KEY': process.env.IP_QUALITY_API_KEY!
      },
      next: {
        revalidate: 86400,
        tags: [`ip-${parsed.toNormalizedString()}`]
      }
    });
    console.log(`Received ${ipQualityScoreSourceId} metadata for ${parsed.toNormalizedString()} (success ${res.success})`);

    return res;
  },
  async fetch(ip: string): Promise<IpMetadata> {
    const payload = await this.rawFetch(ip);
    const result: Writeable<IpMetadata> = {
      sourceId: ipQualityScoreSourceId,
      ip,
      tags: [],
      raw: payload,
    };

    if (payload.success) {
      result.hostname = payload.host;

      if (payload.latitude && payload.longitude) {
        result.coordinates = {
          latitude: payload.latitude,
          longitude: payload.longitude,
        };
      }

      if (payload.country_code !== 'N/A') {
        result.address = {
          city: removeNA(payload.city),
          postalCode: removeNA(payload.zip_code),
          region: removeNA(payload.region),
          country: countries.getName(payload.country_code, 'en') ?? '',
          countryCode: payload.country_code
        };
      }

      if (payload.ASN) {
        result.asn = {
          asn: payload.ASN,
          organisation: payload.ISP,
        };
      }

      const tags: Tag[] = [];

      if (payload.bot_status || payload.is_crawler) {
        tags.push({ label: 'bot', color: 'info' });
      }

      if (payload.proxy) {
        tags.push({ label: 'proxy' });
      }

      if (payload.active_vpn || payload.vpn) {
        tags.push({ label: 'vpn', color: 'warning' });
      }

      if (payload.active_tor || payload.tor) {
        tags.push({ label: 'tor', color: 'warning' });
      }

      result.tags = tags;
    }

    return result;
  }
};

export default ipQualityScore;

// Utils
function removeNA(value: string): string | undefined {
  return value !== 'N/A' ? value : undefined;
}
