import type { IpMetadata } from '@/data/ip-metadata';
import {
  extractAddress,
  extractAutonomousSystem,
  extractCoordinates,
  extractTags
} from '@/lib/server/ip-data/extractors';
import { queryIpData } from '@/lib/server/ip-data/ip-data';
import ipaddr from 'ipaddr.js';

// Types
/** @deprecated */
export interface IpDataResult {
  readonly ip: string;
  readonly is_eu: boolean;
  readonly city: string;
  readonly region: string;
  readonly region_code: string;
  readonly region_type: string;
  readonly country_name: string;
  readonly country_code: string;
  readonly continent_name: string;
  readonly continent_code: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly postal: string;
  readonly calling_code: string;
  readonly flag: string;
  readonly emoji_flag: string;
  readonly emoji_unicode: string;
  readonly asn?: IpDataASN;
  readonly carrier: IpDataCarrier;
  readonly threat: IpDataThreat;
  readonly count: string;
}

/** @deprecated */
export interface IpDataASN {
  readonly asn: string;
  readonly name: string;
  readonly domain: string | null;
  readonly route: string;
  readonly type: string;
}

/** @deprecated */
export interface IpDataCarrier {
  readonly name: string;
  readonly mcc: string;
  readonly mnc: string;
}

/** @deprecated */
export interface IpDataThreat {
  readonly is_tor: boolean;
  readonly is_vpn: boolean;
  readonly is_icloud_relay: boolean;
  readonly is_proxy: boolean;
  readonly is_datacenter: boolean;
  readonly is_anonymous: boolean;
  readonly is_known_attacker: boolean;
  readonly is_known_abuser: boolean;
  readonly is_threat: boolean;
  readonly is_bogon: boolean;
  readonly blocklists: readonly IpDataBlocklist[];
}

/** @deprecated */
export interface IpDataBlocklist {
  readonly name: string;
  readonly site: string;
  readonly type: string;
}

/** @deprecated */
export interface IpDataBogon {
  readonly ip: string;
  readonly is_bogon: boolean;
}

// Service
/** @deprecated */
export const ipDataColor = '#3598d4';
/** @deprecated */
export const ipDataSourceId = 'ip-data' as const;

/** @deprecated */
const ipData = {
  name: 'ipdata',
  color: ipDataColor,
  sourceId: ipDataSourceId,
  async rawFetch(ip: string): Promise<IpDataResult | IpDataBogon> {
    const parsed = ipaddr.parse(ip);
    return await queryIpData(parsed) ?? { ip, is_bogon: true };
  },
  async fetch(ip: string): Promise<IpMetadata> {
    const payload = await this.rawFetch(ip);
    const result: Writeable<IpMetadata> = {
      sourceId: ipDataSourceId,
      ip,
      tags: [],
      raw: payload,
    };

    if ('is_bogon' in payload) {
      result.tags = [{ label: 'bogon' }];
    } else {
      result.coordinates = extractCoordinates(payload);
      result.address = extractAddress(payload);

      if (payload.asn) {
        result.asn = extractAutonomousSystem(payload)!;
      }

      result.tags = extractTags(payload);
    }

    return result;
  },
};

export default ipData;
