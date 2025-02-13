import type { IpMetadata } from '@/data/ip-metadata';
import { extractAddress, extractAutonomousSystem, extractCoordinates } from '@/lib/server/ip-info/extractors';
import { queryIpInfo } from '@/lib/server/ip-info/ip-info';
import ipaddr from 'ipaddr.js';

// Types
/** @deprecated */
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
  readonly anycast: boolean;
  readonly bogon?: false;
}

/** @deprecated */
export interface IpInfoBogon {
  readonly ip: string;
  readonly bogon: true;
}

/** @deprecated */
export type IpInfoResult = IpInfoFound | IpInfoBogon;

// Service
/** @deprecated */
export const ipInfoColor = '#3091cf';
/** @deprecated */
export const ipInfoSourceId = 'ip-info' as const;

/** @deprecated */
const ipInfo = {
  name: 'IPinfo',
  color: ipInfoColor,
  sourceId: ipInfoSourceId,
  async rawFetch(ip: string): Promise<IpInfoResult> {
    const parsed = ipaddr.parse(ip);
    return await queryIpInfo(parsed) ?? { ip, bogon: true };
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
      result.hostname = payload.hostname;
      result.coordinates = extractCoordinates(payload);
      result.address = extractAddress(payload);

      if (payload.org) {
        result.asn = extractAutonomousSystem(payload)!;
      }
    } else {
      result.tags = [{ label: 'bogon' }];
    }

    return result;
  }
};

export default ipInfo;
