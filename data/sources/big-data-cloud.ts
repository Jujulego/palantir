import type { IpMetadata, Tag } from '@/data/ip-metadata';
import { FetchError } from '@/utils/fetch';
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

// Utils
export async function rawFetchBigDataCloud(ip: string): Promise<BigDataCloudResult> {
  const parsed = ipaddr.parse(ip);

  // Do not request for "bogon" ips
  if (['private', 'loopback'].includes(parsed.range())) {
    return {};
  }

  // Make request
  console.log(`Fetching BigDataCloud for ${parsed.toNormalizedString()}`);
  const url = new URL(`https://api-bdc.net/data/ip-geolocation-full`);
  url.searchParams.set('ip', parsed.toNormalizedString());
  url.searchParams.set('key', process.env.BIG_DATA_CLOUD_KEY!);

  const res = await fetch(url, {
    next: {
      revalidate: 86400,
      tags: [parsed.toNormalizedString()]
    }
  });
  console.log(`Received BigDataCloud metadata for ${parsed.toNormalizedString()} (status = ${res.status})`);

  if (!res.ok) {
    throw new FetchError(res.status, await res.text());
  }

  return await res.json();
}

export async function fetchBigDataCloud(ip: string): Promise<IpMetadata> {
  const payload = await rawFetchBigDataCloud(ip);
  const result: Writeable<IpMetadata> = {
    ip,
    tags: [],
  };

  if (payload.location) {
    result.coordinates = {
      latitude: payload.location.latitude,
      longitude: payload.location.longitude,
    };

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
    }
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
