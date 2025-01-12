import type { IpMetadata } from '@/data/ip-metadata';
import { FetchError, jsonFetch } from '@/utils/fetch';
import ipaddr from 'ipaddr.js';

// Types
export interface IpGeolocationCurrency {
  readonly code: string;
  readonly name: string;
  readonly symbol: string;
}

export interface IpGeolocationTimezone {
  readonly name: string;
  readonly offset: number;
  readonly current_time: string;
  readonly current_time_unix: number;
  readonly is_dst: boolean;
  readonly dst_savings: number;
}

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

export interface IpGeolocationBogon {
  readonly ip: string;
  readonly is_bogon: boolean;
}

// Service
export const ipGeolocationColor = '#6c63fd';
export const ipGeolocationSourceId = 'ip-geolocation' as const;

const ipGeolocation = {
  name: 'ipgeolocation',
  color: ipGeolocationColor,
  sourceId: ipGeolocationSourceId,
  async rawFetch(ip: string): Promise<IpGeolocationResult | IpGeolocationBogon> {
    const parsed = ipaddr.parse(ip);

    // Do not request for "bogon" ips
    if (['private', 'loopback'].includes(parsed.range())) {
      return { ip, is_bogon: true };
    }

    // Make request
    console.log(`Fetching ${ipGeolocationSourceId} for ${parsed.toNormalizedString()}`);
    const url = new URL('https://api.ipgeolocation.io/ipgeo');
    url.searchParams.set('apiKey', process.env.IP_GEOLOCATION_API_KEY!);
    url.searchParams.set('ip', parsed.toNormalizedString());

    try {
      const res = await jsonFetch<IpGeolocationResult>(url, {
        next: {
          revalidate: 86400,
          tags: [parsed.toNormalizedString()],
        }
      });
      console.log(`Received ${ipGeolocationSourceId} metadata for ${parsed.toNormalizedString()}`);

      return res;
    } catch (err) {
      if (err instanceof FetchError && err.status === 423) {
        console.log(`Received ${ipGeolocationSourceId} metadata for ${parsed.toNormalizedString()} (bogon)`);
        return { ip, is_bogon: true };
      }

      throw err;
    }
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
      result.coordinates = {
        latitude: parseFloat(payload.latitude),
        longitude: parseFloat(payload.longitude),
      };
      result.address = {
        city: payload.city,
        postalCode: payload.zipcode,
        region: payload.state_prov,
        country: payload.country_name,
        countryCode: payload.country_code2,
      };

      if (payload.asn && payload.organization) {
        result.asn = {
          asn: parseInt(payload.asn.slice(2), 10),
          organisation: payload.organization,
        };
      }

      if (payload.connection_type) {
        result.tags = [{ label: payload.connection_type }];
      }
    }

    return result;
  }
};

export default ipGeolocation;
