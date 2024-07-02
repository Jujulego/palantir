import { searchIpInfo } from '@/src/ip-info/data';

// Component
export interface IpInfoAddressProps {
  readonly ip: string;
}

export default async function IpInfoAddress({ ip }: IpInfoAddressProps) {
  const result = await searchIpInfo(ip);
  return `${result.postal ?? ''} ${result.city ?? ''}`;
}
