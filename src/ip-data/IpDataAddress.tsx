import { searchIpData } from '@/src/ip-data/data';

// Component
export interface IpDataAddressProps {
  readonly ip: string;
}

export default async function IpDataAddress({ ip }: IpDataAddressProps) {
  const result = await searchIpData(ip);

  return `${result.postal ?? ''} ${result.city ?? ''}`;
}
