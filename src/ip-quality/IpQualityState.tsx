import { searchIpQuality } from '@/src/ip-quality/data';

// Component
export interface IpQualityStateProps {
  readonly ip: string;
}

export default async function IpQualityState({ ip }: IpQualityStateProps) {
  const result = await searchIpQuality(ip);
  return result.region;
}
