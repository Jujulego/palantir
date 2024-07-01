import { searchIpInfo } from '@/src/ip-info/data';

// Component
export interface IpInfoStateProps {
  readonly ip: string;
}

export default async function IpInfoState({ ip }: IpInfoStateProps) {
  const result = await searchIpInfo(ip);
  return result.region;
}
