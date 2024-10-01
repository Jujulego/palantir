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

export interface ASN {
  readonly asn: string;
  readonly name: string;
}

export interface IpLocation {
  readonly ip: string;
  readonly hostname?: string;
  readonly source: string;
  readonly asn?: ASN;
  readonly address?: Address;
  readonly coordinates?: Coordinates;
}
