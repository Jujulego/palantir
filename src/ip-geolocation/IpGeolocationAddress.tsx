import { searchIpGeolocation } from '@/src/ip-geolocation/data';

// Component
export interface IpGeolocationAddressProps {
  readonly ip: string;
}

export default async function IpGeolocationAddress({ ip }: IpGeolocationAddressProps) {
  const result = await searchIpGeolocation(ip);
  return `${result.zipcode} ${result.city}`;
}
