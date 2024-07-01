import { Box } from '@mui/material';

import { searchIpGeolocation } from '@/src/ip-geolocation/data';

// Component
export interface IpGeolocationCountryProps {
  readonly ip: string;
}

export default async function IpGeolocationCountry({ ip }: IpGeolocationCountryProps) {
  const result = await searchIpGeolocation(ip);

  return <>
    { result.country_emoji } { result.country_name }{' '}
    { result.country_code2 && (
      <Box component="span" color="text.secondary">({ result.country_code2 })</Box>
    ) }
  </>;
}
