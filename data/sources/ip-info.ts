import type { IpMetadata } from '@/data/ip-metadata';
import { FetchError } from '@/utils/fetch';
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

// Constants
export const sourceId = 'ip-info';
export const sourceLabel = 'IP Info';

// Utils
export async function rawFetchIpInfo(ip: string): Promise<IpInfoResult> {
  const parsed = ipaddr.parse(ip);

  // Do not request for "bogon" ips
  if (['private', 'loopback'].includes(parsed.range())) {
    return { ip, bogon: true };
  }

  // Make request
  console.log(`Fetching ${sourceLabel} for ${parsed.toNormalizedString()}`);
  const url = new URL(`https://ipinfo.io/${parsed.toNormalizedString()}/json`);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.IP_INFO_TOKEN}`
    },
    next: {
      revalidate: 86400,
      tags: [parsed.toNormalizedString()]
    }
  });
  console.log(`Received ${sourceLabel} metadata for ${parsed.toNormalizedString()} (status = ${res.status})`);

  if (!res.ok) {
    throw new FetchError(res.status, await res.text());
  }

  return await res.json();
}

export async function fetchIpInfo(ip: string): Promise<IpMetadata> {
  const payload = await rawFetchIpInfo(ip);
  const result: Writeable<IpMetadata> = {
    sourceId,
    ip,
    tags: [],
  };

  if (!payload.bogon) {
    const [latitude, longitude] = payload.loc.split(',') as [string, string];

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
