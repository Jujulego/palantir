import { searchIpQuality } from '@/src/ip-quality/data';

// Component
export interface IpQualityCountryProps {
  readonly ip: string;
}

export default async function IpQualityCountry({ ip }: IpQualityCountryProps) {
  const result = await searchIpQuality(ip);
  return result.country_code;
}
