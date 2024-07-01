import { searchIpGeolocation } from '@/src/ip-geolocation/data';

// Component
export interface IpGeolocationISPProps {
  readonly ip: string;
}

export default async function IpGeolocationISP({ ip }: IpGeolocationISPProps) {
  const result = await searchIpGeolocation(ip);
  return result.isp;
}
