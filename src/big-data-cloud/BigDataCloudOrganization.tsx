import { searchBigDataCloud } from '@/src/big-data-cloud/data';
import { Box } from '@mui/material';

// Component
export interface BigDataCloudOrganizationProps {
  readonly ip: string;
}

export default async function BigDataCloudOrganization({ ip }: BigDataCloudOrganizationProps) {
  const result = await searchBigDataCloud(ip);

  return <>
    { result.network?.organisation }{' '}
    { result.network?.registeredCountry && (
      <Box component="span" color="text.secondary">({ result.network?.registeredCountry })</Box>
    ) }
  </>;
}
