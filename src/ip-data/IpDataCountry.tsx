import Box from '@mui/material/Box';

import { searchIpData } from '@/src/ip-data/data';

// Component
export interface IpDataCountryProps {
  readonly ip: string;
}

export default async function IpDataCountry({ ip }: IpDataCountryProps) {
  const result = await searchIpData(ip);

  return <>
    { result.emoji_flag } { result.country_name }{' '}
    { result.country_code && (
      <Box component="span" color="text.secondary">({ result.country_code })</Box>
    ) }
  </>;
}
