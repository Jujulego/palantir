import { Box } from '@mui/material';

import { searchIpGeolocation } from '@/src/ip-geolocation/data';

// Component
export interface IpGeolocationStateProps {
  readonly ip: string;
}

export default async function IpGeolocationState({ ip }: IpGeolocationStateProps) {
  const result = await searchIpGeolocation(ip);
  return (<>
    { result.state_prov } <Box component="span" color="text.secondary">({ result.state_code })</Box>
  </>);
}
