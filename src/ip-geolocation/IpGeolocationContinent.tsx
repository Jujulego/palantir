import { Box } from '@mui/material';

import { searchIpGeolocation } from '@/src/ip-geolocation/data';

// Component
export interface IpGeolocationContinentProps {
  readonly ip: string;
}

export default async function IpGeolocationContinent({ ip }: IpGeolocationContinentProps) {
  const result = await searchIpGeolocation(ip);

  return (<>
    { result.continent_name } <Box component="span" color="text.secondary">({ result.continent_code })</Box>
  </>);
}
