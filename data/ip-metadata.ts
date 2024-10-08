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

export interface ASN {
  readonly asn: number;
  readonly organisation: string;
}

export interface Tag {
  readonly label: string;
  readonly color?: 'info' | 'success' | 'warning' | 'error';
}

export interface IpMetadata {
  readonly ip: string;
  readonly hostname?: string;
  readonly asn?: ASN;
  readonly address?: Address;
  readonly coordinates?: Coordinates;
  readonly tags: readonly Tag[];
}

// Utils
export function mergeIpMetadata(data: IpMetadata[]): IpMetadata {
  return data.slice(1).reduce<Writeable<IpMetadata>>((agg, item) => {
    if (!agg.hostname) {
      agg.hostname = item.hostname;
    }

    if (!agg.asn) {
      agg.asn = item.asn;
    }

    if (!agg.coordinates) {
      agg.coordinates = item.coordinates;
    }

    if (!agg.address) {
      agg.address = item.address;
    }

    const tags = [...agg.tags];

    for (const tag of item.tags) {
      if (tags.every((t) => t.label !== tag.label)) {
        tags.push(tag);
      }
    }

    agg.tags = tags;

    return agg;
  }, { ...data[0] });
}
