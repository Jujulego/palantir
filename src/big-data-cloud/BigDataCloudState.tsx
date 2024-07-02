import { Box } from '@mui/material';

import { searchBigDataCloud } from '@/src/big-data-cloud/data';

// Component
export interface BigDataCloudStateProps {
  readonly ip: string;
}

export default async function BigDataCloudState({ ip }: BigDataCloudStateProps) {
  const result = await searchBigDataCloud(ip);

  return <>
    { result.location?.isoPrincipalSubdivision }{' '}
    { result.location?.isoPrincipalSubdivisionCode && (
      <Box component="span" color="text.secondary">({ result.location.isoPrincipalSubdivisionCode })</Box>
    ) }
  </>;
}
