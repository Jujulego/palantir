import type { IpMetadata, Tag } from '@/data/ip-metadata';
import { FetchError, jsonFetch } from '@/utils/fetch';
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

export interface IpDataBogon {
  readonly ip: string;
  readonly is_bogon: boolean;
}

// Service
const sourceId = 'ip-data' as const;

const ipData = {
  sourceId,
  async rawFetch(ip: string): Promise<IpDataResult | IpDataBogon> {
    const parsed = ipaddr.parse(ip);

    // Do not request for "bogon" ips
    if (['private', 'loopback'].includes(parsed.range())) {
      return { ip, is_bogon: true };
    }

    // Make request
    console.log(`Fetching ${sourceId} for ${parsed.toNormalizedString()}`);
    const url = new URL(`https://eu-api.ipdata.co/${parsed.toNormalizedString()}`);
    url.searchParams.set('api-key', process.env.IP_DATA_API_KEY!);

    try {
      const res = await jsonFetch<IpDataResult>(url, {
        next: {
          revalidate: 86400,
          tags: [parsed.toNormalizedString()],
        }
      });
      console.log(`Received ${sourceId} metadata for ${parsed.toNormalizedString()}`);

      return res;
    } catch (err) {
      if (err instanceof FetchError && err.status === 400) {
        const { message } = JSON.parse(err.content) as { readonly message: string };

        if (message.match(/is a (reserved|private) IP address\.$/)) {
          console.log(`Received ${sourceId} metadata for ${parsed.toNormalizedString()} (reserved or private)`);
          return { ip, is_bogon: true };
        }
      }

      throw err;
    }
  },
  async fetch(ip: string): Promise<IpMetadata> {
    const payload = await this.rawFetch(ip);
    const result: Writeable<IpMetadata> = {
      sourceId,
      ip,
      tags: [],
      raw: payload,
    };

    if ('is_bogon' in payload) {
      result.tags = [{ label: 'bogon' }];
    } else {
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
          organisation: payload.asn.name,
        };
      }

      const tags: Tag[] = [];

      if (payload.threat.is_bogon) {
        tags.push({ label: 'bogon' });
      }

      if (payload.threat.is_datacenter) {
        tags.push({ label: 'datacenter', color: 'info' });
      }

      if (payload.threat.is_icloud_relay) {
        tags.push({ label: 'iCloud relay', color: 'info' });
      }

      if (payload.threat.is_proxy) {
        tags.push({ label: 'proxy' });
      }

      if (payload.threat.is_vpn) {
        tags.push({ label: 'vpn', color: 'warning' });
      }

      if (payload.threat.is_tor) {
        tags.push({ label: 'tor', color: 'warning' });
      }

      if (payload.threat.is_known_attacker) {
        tags.push({ label: 'attacker', color: 'error' });
      }

      if (payload.threat.is_known_abuser) {
        tags.push({ label: 'abuser', color: 'error' });
      }

      result.tags = tags;
    }

    return result;
  },
};

export default ipData;
