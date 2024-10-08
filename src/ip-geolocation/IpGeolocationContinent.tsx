import Box from '@mui/material/Box';

import { searchIpGeolocation } from '@/src/ip-geolocation/data';

// Component
export interface IpGeolocationContinentProps {
  readonly ip: string;
}

export default async function IpGeolocationContinent({ ip }: IpGeolocationContinentProps) {
  const result = await searchIpGeolocation(ip);

  return <>
    { result.continent_name }{' '}
    { result.continent_code && (
      <Box component="span" color="text.secondary">({ result.continent_code })</Box>
    ) }
  </>;
}
