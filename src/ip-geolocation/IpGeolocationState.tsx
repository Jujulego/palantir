import { RefSpan } from '@/src/common/utils';
import { searchIpGeolocation } from '@/src/ip-geolocation/data';

// Component
export interface IpGeolocationStateProps {
  readonly ip: string;
}

export default async function IpGeolocationState({ ip }: IpGeolocationStateProps) {
  const result = await searchIpGeolocation(ip);
  return <>{ result.state_prov } <RefSpan>({ result.state_code })</RefSpan></>;
}
