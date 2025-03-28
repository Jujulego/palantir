export interface IpGeolocationFullResult {
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
  readonly carriers: readonly BigDataCloudNetworkCarrier[];
}

export interface BigDataCloudNetworkCarrier {
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
