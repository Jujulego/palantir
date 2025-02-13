export interface IpDataResult {
  readonly ip: string;
  readonly is_eu: boolean;
  readonly city: string;
  readonly region: string;
  readonly region_code: string;
  readonly region_type: string;
  readonly country_name: string;
  readonly country_code: string;
  readonly continent_name: string;
  readonly continent_code: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly postal: string;
  readonly calling_code: string;
  readonly flag: string;
  readonly emoji_flag: string;
  readonly emoji_unicode: string;
  readonly asn?: IpDataASN;
  readonly carrier: IpDataCarrier;
  readonly threat: IpDataThreat;
  readonly count: string;
}

export interface IpDataASN {
  readonly asn: string;
  readonly name: string;
  readonly domain: string | null;
  readonly route: string;
  readonly type: string;
}

export interface IpDataCarrier {
  readonly name: string;
  readonly mcc: string;
  readonly mnc: string;
}

export interface IpDataThreat {
  readonly is_tor: boolean;
  readonly is_vpn: boolean;
  readonly is_icloud_relay: boolean;
  readonly is_proxy: boolean;
  readonly is_datacenter: boolean;
  readonly is_anonymous: boolean;
  readonly is_known_attacker: boolean;
  readonly is_known_abuser: boolean;
  readonly is_threat: boolean;
  readonly is_bogon: boolean;
  readonly blocklists: readonly IpDataBlocklist[];
}

export interface IpDataBlocklist {
  readonly name: string;
  readonly site: string;
  readonly type: string;
}
