import type { IpMetadata } from '@/data/ip-metadata';
import {
  extractAddress,
  extractAutonomousSystem,
  extractCoordinates,
  extractTags
} from '@/lib/server/ip-quality-score/extractors';
import { queryIpQualityScore } from '@/lib/server/ip-quality-score/ip-quality-score';
import ipaddr from 'ipaddr.js';

// Types
/** @deprecated */
interface IpQualityBase {
  readonly request_id: string;
  readonly success: boolean;
  readonly message: string;
  readonly errors: string[];
}

/** @deprecated */
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

/** @deprecated */
export interface IpQualityError extends IpQualityBase {
  readonly success: false;
}

/** @deprecated */
export type IpQualityResult = IpQualitySuccess | IpQualityError;

// Service
/** @deprecated */
export const ipQualityScoreColor = '#f43a3a';
/** @deprecated */
export const ipQualityScoreSourceId = 'ip-quality-score' as const;

/** @deprecated */
const ipQualityScore = {
  name: 'IPQS',
  color: ipQualityScoreColor,
  sourceId: ipQualityScoreSourceId,
  async rawFetch(ip: string): Promise<IpQualityResult> {
    const parsed = ipaddr.parse(ip);
    return await queryIpQualityScore(parsed) ?? { success: false, request_id: 'id', message: 'nope', errors: [] };
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
        result.coordinates = extractCoordinates(payload)!;
      }

      if (payload.country_code !== 'N/A') {
        result.address = extractAddress(payload)!;
      }

      if (payload.ASN) {
        result.asn = extractAutonomousSystem(payload)!;
      }

      result.tags = extractTags(payload);
    }

    return result;
  }
};

export default ipQualityScore;
