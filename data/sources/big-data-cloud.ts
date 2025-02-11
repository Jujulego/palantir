import type { IpMetadata } from '@/data/ip-metadata';
import { queryIpGeolocationFull } from '@/lib/server/big-data-cloud/ip-geolocation';
import { extractLocation } from '@/lib/server/big-data-cloud/extractors';
import type { Tag } from '@/lib/utils/tag';
import ipaddr from 'ipaddr.js';

// Types
export interface BigDataCloudResult {
  readonly country?: BigDataCloudCountry;
  readonly location?: BigDataCloudLocation;
  readonly network?: BigDataCloudNetwork;
  readonly hazardReport?: BigDataCloudHazardReport;
  readonly confidenceArea?: readonly BigDataCloudPoint[];
}

export interface BigDataCloudCountry {
  readonly isoAlpha2: string;
  readonly isoAlpha3: string;
  readonly m49Code: number;
  readonly name: string;
  readonly isoName: string;
  readonly isoNameFull: string;
  readonly countryFlagEmoji: string;
  readonly wikidataId: string;
  readonly geonameId: number;
  readonly isIndependent: boolean;
}

export interface BigDataCloudLocation {
  readonly principalSubdivision: string;
  readonly isoPrincipalSubdivision: string;
  readonly isoPrincipalSubdivisionCode: string;
  readonly continent: string;
  readonly continentCode: string;
  readonly city: string;
  readonly localityName: string;
  readonly postcode: string;
  readonly longitude: number;
  readonly latitude: number;
  readonly plusCode: string;
}

export interface BigDataCloudNetwork {
  readonly registry: string;
  readonly registryStatus: string;
  readonly registeredCountry: string;
  readonly registeredCountryName: string;
  readonly organisation: string;
  readonly isReachableGlobally: boolean;
  readonly isBogon: boolean;
  readonly bgpPrefix: string;
  readonly bgpPrefixNetworkAddress: string;
  readonly bgpPrefixLastAddress: string;
  readonly totalAddresses: number;
  readonly carriers: readonly BigDataCloudCarrier[];
}

export interface BigDataCloudCarrier {
  readonly asn: string;
  readonly asnNumeric: number;
  readonly organisation: string;
  readonly name: string;
  readonly registry: string;
  readonly registeredCountry: string;
  readonly registeredCountryName: string;
  readonly registrationDate: string;
  readonly registrationLastChange: string;
  readonly totalIpv4Addresses: number;
  readonly totalIpv4Prefixes: number;
  readonly totalIpv4BogonPrefixes: number;
  readonly totalIpv6Prefixes: number;
  readonly totalIpv6BogonPrefixes: number;
  readonly rank: number;
  readonly rankText: string;
}

export interface BigDataCloudHazardReport {
  readonly isKnownAsTorServer: boolean;
  readonly isKnownAsVpn: boolean;
  readonly isKnownAsProxy: boolean;
  readonly isSpamhausDrop: boolean;
  readonly isSpamhausEdrop: boolean;
  readonly isSpamhausAsnDrop: boolean;
  readonly isBlacklistedUceprotect: boolean;
  readonly isBlacklistedBlocklistDe: boolean;
  readonly isKnownAsMailServer: boolean;
  readonly mailServerDomain: string;
  readonly isKnownAsPublicRouter: boolean;
  readonly isBogon: boolean;
  readonly isUnreachable: boolean;
  readonly hostingLikelihood: number;
  readonly isHostingAsn: boolean;
  readonly isCellular: boolean;
  readonly iCloudPrivateRelay: boolean;
}

export interface BigDataCloudPoint {
  readonly latitude: number;
  readonly longitude: number;
}

// Service
export const bigDataCloudColor = '#e36327';
export const bigDataCloudSourceId = 'big-data-cloud' as const;

const bigDataCloud = {
  name: 'Big Data Cloud',
  color: bigDataCloudColor,
  sourceId: bigDataCloudSourceId,
  /** @deprecated */
  async rawFetch(ip: string): Promise<BigDataCloudResult> {
    return queryIpGeolocationFull(ipaddr.parse(ip));
  },
  async fetch(ip: string): Promise<IpMetadata> {
    const payload = await this.rawFetch(ip);
    const result: Writeable<IpMetadata> = {
      sourceId: bigDataCloudSourceId,
      ip,
      tags: [],
      raw: payload,
    };

    if (payload.location) {
      result.coordinates = extractLocation(payload)!;

      if (payload.country) {
        result.address = {
          city: payload.location.city,
          postalCode: payload.location.postcode,
          region: payload.location.principalSubdivision,
          country: payload.country.name,
          countryCode: payload.country.isoAlpha2,
        };
      }
    }

    if (payload.network?.carriers?.length) {
      result.asn = {
        asn: payload.network.carriers[0].asnNumeric,
        organisation: payload.network.carriers[0].organisation,
      };
    }

    const tags: Tag[] = [];

    if (payload.hazardReport?.isCellular) {
      tags.push({ label: 'cellular', color: 'info' });
    }

    if (payload.hazardReport?.isKnownAsPublicRouter) {
      tags.push({ label: 'public router', color: 'info' });
    }

    if (payload.hazardReport?.iCloudPrivateRelay) {
      tags.push({ label: 'iCloud relay', color: 'info' });
    }

    if (payload.network?.isBogon) {
      tags.push({ label: 'bogon' });
    }

    if (payload.hazardReport?.isKnownAsMailServer) {
      tags.push({ label: 'mail server' });
    }

    if (payload.hazardReport?.isKnownAsVpn) {
      tags.push({ label: 'vpn', color: 'warning' });
    }

    if (payload.hazardReport?.isKnownAsTorServer) {
      tags.push({ label: 'tor', color: 'warning' });
    }

    if (payload.hazardReport?.isBlacklistedBlocklistDe || payload.hazardReport?.isBlacklistedUceprotect) {
      tags.push({ label: 'blacklisted', color: 'error' });
    }

    if (payload.hazardReport?.isSpamhausDrop || payload.hazardReport?.isSpamhausEdrop || payload.hazardReport?.isSpamhausAsnDrop) {
      tags.push({ label: 'spamhaus', color: 'error' });
    }

    result.tags = tags;

    return result;
  }
};

export default bigDataCloud;
