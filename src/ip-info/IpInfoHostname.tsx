import { searchIpInfo } from '@/src/ip-info/data';

// Component
export interface IpInfoHostnameProps {
  readonly ip: string;
}

export default async function IpInfoHostname({ ip }: IpInfoHostnameProps) {
  const result = await searchIpInfo(ip);
  return result.hostname;
}
