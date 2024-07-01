import { searchIpInfo } from '@/src/ip-info/data';

// Component
export interface IpInfoOrganizationProps {
  readonly ip: string;
}

export default async function IpInfoOrganization({ ip }: IpInfoOrganizationProps) {
  const result = await searchIpInfo(ip);
  return result.org;
}
