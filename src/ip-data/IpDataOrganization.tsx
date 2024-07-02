import { searchIpData } from '@/src/ip-data/data';

// Component
export interface IpDataISPProps {
  readonly ip: string;
}

export default async function IpDataOrganization({ ip }: IpDataISPProps) {
  const result = await searchIpData(ip);

  return `${result.asn?.asn ?? ''} ${result.asn?.name ?? ''}`;
}
