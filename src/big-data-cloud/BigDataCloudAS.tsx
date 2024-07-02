import { searchBigDataCloud } from '@/src/big-data-cloud/data';
import { Box } from '@mui/material';

// Component
export interface BigDataCloudASProps {
  readonly ip: string;
}

export default async function BigDataCloudAS({ ip }: BigDataCloudASProps) {
  const result = await searchBigDataCloud(ip);
  const carrier = result.network?.carriers?.[0];

  return carrier?.name;
}
