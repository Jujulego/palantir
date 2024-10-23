import ipaddr from 'ipaddr.js';
import { collect$, filter$, map$, of$, pipe$ } from 'kyrielle';

// Types
export interface Coordinates {
  readonly latitude: number;
  readonly longitude: number;
}

export interface Address {
  readonly city?: string;
  readonly postalCode?: string;
  readonly region?: string;
  readonly country: string;
  readonly countryCode: string;
}

export interface Asn {
  readonly asn: number;
  readonly organisation: string;
}

export interface Tag {
  readonly label: string;
  readonly color?: 'info' | 'success' | 'warning' | 'error';
}

export interface IpMetadata {
  readonly source: string;
  readonly ip: string;
  readonly hostname?: string;
  readonly asn?: Asn;
  readonly address?: Address;
  readonly coordinates?: Coordinates;
  readonly tags: readonly Tag[];
}

export interface MergedIpLocation {
  readonly source: string;
  readonly address?: Address;
  readonly coordinates?: Coordinates;
}

export interface MergedIpAsn extends Asn {
  readonly source: readonly string[];
}

export interface MergedIpMetadata {
  readonly ip: string;
  readonly hostname?: string;
  readonly location: readonly MergedIpLocation[];
  readonly asn: readonly MergedIpAsn[];
  readonly tags: readonly Tag[];
}

// Utils
export async function mergeIpMetadata(metadata: [IpMetadata, ...IpMetadata[]]): Promise<MergedIpMetadata> {
  return {
    ip: metadata[0].ip,
    hostname: metadata.find((item) => item.hostname && !ipaddr.isValid(item.hostname))?.hostname,
    location: metadata.map((item) => ({
      source: item.source,
      coordinates: item.coordinates,
      address: item.address,
    })),
    asn: await pipe$(
      of$(metadata),
      filter$((item) => !!item.asn),
      map$((item) => ({ source: [item.source], ...item.asn! })),
      collect$()
    ),
    tags: metadata
      .map((item) => item.tags)
      .flat(),
  };
}
