export interface IpGeolocationResult {
  readonly domain?: string;
  readonly ip: string;
  readonly hostname: string;
  readonly continent_code: string;
  readonly continent_name: string;
  readonly country_code2: string;
  readonly country_code3: string;
  readonly country_name: string;
  readonly country_capital: string;
  readonly state_prov?: string;
  readonly district?: string;
  readonly city?: string;
  readonly zipcode?: string;
  readonly latitude: string;
  readonly longitude: string;
  readonly is_eu: boolean;
  readonly calling_code: string;
  readonly country_tld: string;
  readonly languages: string;
  readonly country_flag: string;
  readonly geoname_id: string; // => https://www.geonames.org/
  readonly isp: string;
  readonly connection_type?: string;
  readonly organization?: string;
  readonly asn?: string;
  readonly currency: IpGeolocationCurrency;
  readonly time_zone: IpGeolocationTimezone;
}

export interface IpGeolocationCurrency {
  readonly code: string;
  readonly name: string;
  readonly symbol: string;
}

export interface IpGeolocationTimezone {
  readonly name: string;
  readonly offset: number;
  readonly current_time: string;
  readonly current_time_unix: number;
  readonly is_dst: boolean;
  readonly dst_savings: number;
}
