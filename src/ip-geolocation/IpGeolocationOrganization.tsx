import { searchIpGeolocation } from '@/src/ip-geolocation/data';

// Component
export interface IpGeolocationOrganizationProps {
  readonly ip: string;
}

export default async function IpGeolocationOrganization({ ip }: IpGeolocationOrganizationProps) {
  const result = await searchIpGeolocation(ip);
  return result.organization;
}
