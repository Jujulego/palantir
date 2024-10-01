export interface Coordinates {
  readonly latitude: number;
  readonly longitude: number;
}

export interface Location {
  readonly country: string;
  readonly coordinates?: Coordinates;
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
  readonly location?: Location;
}
