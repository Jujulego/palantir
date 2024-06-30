import { RefSpan } from '@/src/common/utils';
import { searchIpGeolocation } from '@/src/ip-geolocation/data';

// Component
export interface IpGeolocationCountryProps {
  readonly ip: string;
}

export default async function IpGeolocationCountry({ ip }: IpGeolocationCountryProps) {
  const result = await searchIpGeolocation(ip);
  return <>{ result.country_emoji } { result.country_name } <RefSpan>({ result.country_code2 })</RefSpan></>;
}
