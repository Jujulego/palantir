import { searchBigDataCloud } from '@/src/big-data-cloud/data';
import { Box } from '@mui/material';

// Component
export interface BigDataCloudISPProps {
  readonly ip: string;
}

export default async function BigDataCloudISP({ ip }: BigDataCloudISPProps) {
  const result = await searchBigDataCloud(ip);
  const carrier = result.network?.carriers?.[0];

  return <>
    { carrier?.organisation }{' '}
    { carrier?.registeredCountry && (
      <Box component="span" color="text.secondary">({ carrier?.registeredCountry })</Box>
    ) }
  </>;
}
