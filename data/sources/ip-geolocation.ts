import type { IpMetadata } from '@/data/ip-metadata';
import {
  extractAddress,
  extractAutonomousSystem,
  extractCoordinates,
  extractTags
} from '@/lib/server/ip-geolocation/extractors';
import { queryIpGeolocation } from '@/lib/server/ip-geolocation/ip-geolocation';
import ipaddr from 'ipaddr.js';

// Types
/** @deprecated */
export interface IpGeolocationCurrency {
  readonly code: string;
  readonly name: string;
  readonly symbol: string;
}

/** @deprecated */
export interface IpGeolocationTimezone {
  readonly name: string;
  readonly offset: number;
  readonly current_time: string;
  readonly current_time_unix: number;
  readonly is_dst: boolean;
  readonly dst_savings: number;
}

/** @deprecated */
export interface IpGeolocationResult {
  readonly domain?: string;
  readonly ip: string;
  readonly hostname: string;
  readonly continent_code: string;
  readonly continent_name: string;
  readonly country_code2: string;
  readonly country_code3: string;
  readonly country_name: string;
  readonly country_capital: string;
  readonly state_prov?: string;
  readonly district?: string;
  readonly city?: string;
  readonly zipcode?: string;
  readonly latitude: string;
  readonly longitude: string;
  readonly is_eu: boolean;
  readonly calling_code: string;
  readonly country_tld: string;
  readonly languages: string;
  readonly country_flag: string;
  readonly geoname_id: string; // => https://www.geonames.org/
  readonly isp: string;
  readonly connection_type?: string;
  readonly organization?: string;
  readonly asn?: string;
  readonly currency: IpGeolocationCurrency;
  readonly time_zone: IpGeolocationTimezone;
}

/** @deprecated */
export interface IpGeolocationBogon {
  readonly ip: string;
  readonly is_bogon: boolean;
}

// Service
/** @deprecated */
export const ipGeolocationColor = '#6c63fd';
/** @deprecated */
export const ipGeolocationSourceId = 'ip-geolocation' as const;

/** @deprecated */
const ipGeolocation = {
  name: 'ipgeolocation',
  color: ipGeolocationColor,
  sourceId: ipGeolocationSourceId,
  async rawFetch(ip: string): Promise<IpGeolocationResult | IpGeolocationBogon> {
    const parsed = ipaddr.parse(ip);
    return await queryIpGeolocation(parsed) ?? { ip, is_bogon: true };
  },
  async fetch(ip: string): Promise<IpMetadata> {
    const payload = await this.rawFetch(ip);
    const result: Writeable<IpMetadata> = {
      sourceId: ipGeolocationSourceId,
      ip,
      tags: [],
      raw: payload,
    };

    if ('is_bogon' in payload) {
      result.tags = [{ label: 'bogon' }];
    } else {
      result.hostname = payload.hostname;
      result.coordinates = extractCoordinates(payload);
      result.address = extractAddress(payload);

      if (payload.asn && payload.organization) {
        result.asn = extractAutonomousSystem(payload)!;
      }

      result.tags = extractTags(payload);
    }

    return result;
  }
};

export default ipGeolocation;
