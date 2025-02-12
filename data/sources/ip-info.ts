import type { IpMetadata } from '@/data/ip-metadata';
import { jsonFetch } from '@/utils/fetch';
import countries from 'i18n-iso-countries';
import ipaddr from 'ipaddr.js';

// Types
export interface IpInfoFound {
  readonly ip: string;
  readonly hostname: string;
  readonly city: string;
  readonly region: string;
  readonly country: string;
  readonly loc: string;
  readonly org: string;
  readonly postal: string;
  readonly timezone: string;
  readonly bogon?: false;
}

export interface IpInfoBogon {
  readonly ip: string;
  readonly bogon: true;
}

export type IpInfoResult = IpInfoFound | IpInfoBogon;

// Service
export const ipInfoColor = '#3091cf';
export const ipInfoSourceId = 'ip-info' as const;

const ipInfo = {
  name: 'IPinfo',
  color: ipInfoColor,
  sourceId: ipInfoSourceId,
  async rawFetch(ip: string): Promise<IpInfoResult> {
    const parsed = ipaddr.parse(ip);

    // Do not request for "bogon" ips
    if (['private', 'loopback'].includes(parsed.range())) {
      return { ip, bogon: true };
    }

    // Make request
    console.log(`Fetching ${ipInfoSourceId} for ${parsed.toNormalizedString()}`);
    const url = new URL(`https://ipinfo.io/${parsed.toNormalizedString()}/json`);
    const res = await jsonFetch<IpInfoResult>(url, {
      headers: {
        Authorization: `Bearer ${process.env.IP_INFO_TOKEN}`
      },
      next: {
        revalidate: 86400,
        tags: [`ip-${parsed.toNormalizedString()}`]
      }
    });
    console.log(`Received ${ipInfoSourceId} metadata for ${parsed.toNormalizedString()}`);
    console.log(res);

    return res;
  },
  async fetch(ip: string): Promise<IpMetadata> {
    const payload = await this.rawFetch(ip);
    const result: Writeable<IpMetadata> = {
      sourceId: ipInfoSourceId,
      ip,
      tags: [],
      raw: payload,
    };

    if (!payload.bogon) {
      const [latitude, longitude] = payload.loc.split(',');

      result.hostname = payload.hostname;
      result.coordinates = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };
      result.address = {
        city: payload.city,
        postalCode: payload.postal,
        region: payload.region,
        country: countries.getName(payload.country, 'en') ?? '',
        countryCode: payload.country,
      };

      if (payload.org) {
        const idx = payload.org.indexOf(' ');

        result.asn = {
          asn: parseInt(payload.org.slice(2, idx), 10),
          organisation: payload.org.slice(idx + 1),
        };
      }
    } else {
      result.tags = [{ label: 'bogon' }];
    }

    return result;
  }
};

export default ipInfo;
