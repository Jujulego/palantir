import type { IpLocation } from '@/data/ip-location';
import countries from 'i18n-iso-countries';
import ipaddr from 'ipaddr.js';

import 'server-only';

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

// Utils
export async function rawFetchIpInfo(ip: string): Promise<IpInfoResult> {
  const parsed = ipaddr.parse(ip);

  // Do not request for "bogon" ips
  if (['private', 'loopback'].includes(parsed.range())) {
    return { ip, bogon: true };
  }

  // Make request
  console.log(`Fetching IpInfo for ${parsed.toNormalizedString()}`);
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

  return await res.json();
}

export async function fetchIpInfo(ip: string): Promise<IpLocation> {
  const payload = await rawFetchIpInfo(ip);
  const result: Writeable<IpLocation> = {
    ip,
    source: 'IPinfo',
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
        asn: payload.org.slice(0, idx),
        name: payload.org.slice(idx + 1),
      };
    }
  }

  return result;
}
