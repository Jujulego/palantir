import { RefSpan } from '@/src/common/utils';
import { searchIpGeolocation } from '@/src/ip-geolocation/data';

// Component
export interface IpGeolocationContinentProps {
  readonly ip: string;
}

export default async function IpGeolocationContinent({ ip }: IpGeolocationContinentProps) {
  const result = await searchIpGeolocation(ip);
  return <>{ result.continent_name } <RefSpan>({ result.continent_code })</RefSpan></>;
}
