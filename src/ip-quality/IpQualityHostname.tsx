import { searchIpQuality } from '@/src/ip-quality/data';

// Component
export interface IpInfoHostnameProps {
  readonly ip: string;
}

export default async function IpQualityHostname({ ip }: IpInfoHostnameProps) {
  const result = await searchIpQuality(ip);
  return result.host ?? ip;
}
