import { searchBigDataCloud } from '@/src/big-data-cloud/data';

// Component
export interface BigDataCloudAddressProps {
  readonly ip: string;
}

export default async function BigDataCloudAddress({ ip }: BigDataCloudAddressProps) {
  const result = await searchBigDataCloud(ip);

  return `${result.location?.postcode ?? ''} ${result.location?.city ?? ''}`;
}
