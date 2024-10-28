import ipaddr from 'ipaddr.js';
import { collect$, filter$, flat$, map$, pipe$, tap$ } from 'kyrielle';

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
  readonly sourceId: string;
  readonly ip: string;
  readonly hostname?: string;
  readonly asn?: Asn;
  readonly address?: Address;
  readonly coordinates?: Coordinates;
  readonly tags: readonly Tag[];
}

export interface MergedIpLocation {
  readonly sourceId: string;
  readonly address?: Address;
  readonly coordinates?: Coordinates;
}

export interface MergedIpAsn extends Asn {
  readonly sourceId: readonly string[];
}

export interface MergedIpMetadata {
  readonly ip: string;
  readonly hostname?: string;
  readonly location: readonly MergedIpLocation[];
  readonly asn: readonly MergedIpAsn[];
  readonly tags: readonly Tag[];
}

// Utils
export function mergeIpMetadata(metadata: [IpMetadata, ...IpMetadata[]]): MergedIpMetadata {
  const tags = new Set<string>();

  return {
    ip: metadata[0].ip,
    hostname: metadata.find((item) => item.hostname && !ipaddr.isValid(item.hostname))?.hostname,
    location: metadata.map((item) => ({
      sourceId: item.sourceId,
      coordinates: item.coordinates,
      address: item.address,
    })),
    asn: pipe$(
      metadata,
      filter$((item) => !!item.asn),
      map$((item) => ({ sourceId: [item.sourceId], ...item.asn! })),
      collect$()
    ),
    tags: pipe$(
      metadata,
      map$((item) => item.tags),
      flat$(),
      filter$((tag) => !tags.has(tag.label)),
      tap$((tag) => tags.add(tag.label)),
      collect$()
    )
  };
}
