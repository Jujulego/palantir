import { searchBigDataCloud } from '@/src/big-data-cloud/data';
import { Box } from '@mui/material';

// Component
export interface BigDataCloudCountryProps {
  readonly ip: string;
}

export default async function BigDataCloudCountry({ ip }: BigDataCloudCountryProps) {
  const result = await searchBigDataCloud(ip);

  return <>
    { result.country?.countryFlagEmoji } { result.country?.isoName }{' '}
    { result.country?.isoAlpha2 && (
      <Box component="span" color="text.secondary">({ result.country.isoAlpha2 })</Box>
    ) }
  </>;
}
