import Box from '@mui/material/Box';

import { searchIpGeolocation } from '@/src/ip-geolocation/data';

// Component
export interface IpGeolocationStateProps {
  readonly ip: string;
}

export default async function IpGeolocationState({ ip }: IpGeolocationStateProps) {
  const result = await searchIpGeolocation(ip);

  return <>
    { result.state_prov }{' '}
    { result.state_code && (
      <Box component="span" color="text.secondary">({ result.state_code })</Box>
    ) }
  </>;
}
