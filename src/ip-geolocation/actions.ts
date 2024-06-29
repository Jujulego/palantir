'use server';

// Actions
export async function searchIpGeolocation(ip: string): Promise<IpGeolocationResult> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IP_GEOLOCATION_API_KEY}&ip=${ip}`, {
    next: {
      revalidate: 86400,
    }
  });

  return await res.json();
}

// Types
export interface IpGeolocationCurrency {
  readonly code: string;
  readonly name: string;
  readonly symbol: string;
}

export interface IpGeolocationTimezone {
  readonly name: string;
  readonly offset: number;
  readonly offset_with_dst: number;
  readonly current_time: string;
  readonly current_time_unix: number;
  readonly is_dst: boolean;
  readonly dst_savings: number;
  readonly dst_exists: boolean;
  readonly dst_start: IpGeolocationDateShift;
  readonly dst_end: IpGeolocationDateShift;
}

export interface IpGeolocationDateShift {
  readonly utc_time: string;
  readonly duration: string;
  readonly gap: boolean;
  readonly dateTimeAfter: string;
  readonly dateTimeBefore: string;
  readonly overlap: boolean;
}

export interface IpGeolocationResult {
  readonly ip: string;
  readonly continent_code: string;
  readonly continent_name: string;
  readonly country_code2: string;
  readonly country_code3: string;
  readonly country_name: string;
  readonly country_name_official: string;
  readonly country_capital: string;
  readonly state_prov: string;
  readonly state_code: string;
  readonly district: string;
  readonly city: string;
  readonly zipcode: string;
  readonly latitude: string;
  readonly longitude: string;
  readonly is_eu: boolean;
  readonly calling_code: string;
  readonly country_tld: string;
  readonly languages: string;
  readonly country_flag: string;
  readonly geoname_id: string;
  readonly isp: string;
  readonly connection_type: string;
  readonly organization: string;
  readonly country_emoji: string;
  readonly currency: IpGeolocationCurrency;
  readonly time_zone: IpGeolocationTimezone;
}
