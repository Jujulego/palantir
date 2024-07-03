import { searchIpQuality } from '@/src/ip-quality/data';

// Component
export interface IpQualityOrganizationProps {
  readonly ip: string;
}

export default async function IpQualityOrganization({ ip }: IpQualityOrganizationProps) {
  const result = await searchIpQuality(ip);

  return result.organization;
}
