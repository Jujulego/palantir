import type { IpMetadata, Tag } from '@/data/ip-metadata';
import { ipCacheDuration } from '@/src/utils/ip';
import ipaddr from 'ipaddr.js';

// Types
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

export interface IpDataASN {
  readonly asn: string;
  readonly name: string;
  readonly domain: string | null;
  readonly route: string;
  readonly type: string;
}

export interface IpDataCarrier {
  readonly name: string;
  readonly mcc: string;
  readonly mnc: string;
}

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

export interface IpDataBlocklist {
  readonly name: string;
  readonly site: string;
  readonly type: string;
}

// Utils
export async function rawFetchIpData(ip: string): Promise<IpDataResult | null> {
  const parsed = ipaddr.parse(ip);

  // Do not request for "bogon" ips
  if (['private', 'loopback'].includes(parsed.range())) {
    return null;
  }

  // Make request
  console.log(`Fetching IpData for ${parsed.toNormalizedString()}`);
  const url = new URL(`https://eu-api.ipdata.co/${parsed.toNormalizedString()}`);
  url.searchParams.set('api-key', process.env.IP_DATA_API_KEY!);

  const res = await fetch(url, {
    next: {
      revalidate: ipCacheDuration(parsed),
      tags: [parsed.toNormalizedString()],
    }
  });
  console.log(`Received IpData metadata for ${parsed.toNormalizedString()} (status = ${res.status})`);

  if (res.status !== 200) {
    return null;
  }

  return await res.json();
}

export async function fetchIpData(ip: string): Promise<IpMetadata> {
  const payload = await rawFetchIpData(ip);
  const result: Writeable<IpMetadata> = {
    ip,
    tags: [],
  };

  if (payload) {
    result.coordinates = {
      latitude: payload.latitude,
      longitude: payload.longitude,
    };

    result.address = {
      city: payload.city,
      postalCode: payload.postal,
      region: payload.region,
      country: payload.country_name,
      countryCode: payload.country_code,
    };

    if (payload.asn) {
      result.asn = {
        asn: parseInt(payload.asn.asn.slice(2), 10),
        name: payload.asn.name,
      };
    }

    const tags: Tag[] = [];

    if (payload.threat.is_bogon) {
      tags.push({ label: 'bogon' });
    }

    if (payload.threat.is_datacenter) {
      tags.push({ label: 'datacenter' });
    }

    if (payload.threat.is_proxy) {
      tags.push({ label: 'proxy' });
    }

    if (payload.threat.is_vpn) {
      tags.push({ label: 'vpn' });
    }

    if (payload.threat.is_tor) {
      tags.push({ label: 'tor' });
    }

    if (payload.threat.is_known_attacker) {
      tags.push({ label: 'attacker' });
    }

    if (payload.threat.is_known_abuser) {
      tags.push({ label: 'abuser' });
    }

    result.tags = tags;
  }

  return result;
}
