import { searchIpQuality } from '@/src/ip-quality/data';

// Component
export interface IpQualityAddressProps {
  readonly ip: string;
}

export default async function IpQualityAddress({ ip }: IpQualityAddressProps) {
  const result = await searchIpQuality(ip);

  return result.city;
}
