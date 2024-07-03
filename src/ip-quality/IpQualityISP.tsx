import { searchIpQuality } from '@/src/ip-quality/data';

// Component
export interface IpQualityISPProps {
  readonly ip: string;
}

export default async function IpQualityISP({ ip }: IpQualityISPProps) {
  const result = await searchIpQuality(ip);

  return result.ISP;
}
