import type { SourceId } from '@/data/sources';

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
  readonly sourceId: SourceId;
  readonly ip: string;
  readonly hostname?: string;
  readonly asn?: Asn;
  readonly address?: Address;
  readonly coordinates?: Coordinates;
  readonly tags: readonly Tag[];
  readonly raw: unknown;
}
