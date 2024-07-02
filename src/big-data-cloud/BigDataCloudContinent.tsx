import { Box } from '@mui/material';

import { searchBigDataCloud } from '@/src/big-data-cloud/data';

// Component
export interface BigDataCloudContinentProps {
  readonly ip: string;
}

export default async function BigDataCloudContinent({ ip }: BigDataCloudContinentProps) {
  const result = await searchBigDataCloud(ip);

  return <>
    { result.location?.continent }{' '}
    { result.location?.continentCode && (
      <Box component="span" color="text.secondary">({ result.location.continentCode })</Box>
    ) }
  </>;
}
