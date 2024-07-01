import { searchIpInfo } from '@/src/ip-info/data';

// Component
export interface IpInfoCountryProps {
  readonly ip: string;
}

export default async function IpInfoCountry({ ip }: IpInfoCountryProps) {
  const result = await searchIpInfo(ip);
  return result.country;
}
