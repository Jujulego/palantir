import { Box } from '@mui/material';

import { searchIpData } from '@/src/ip-data/data';

// Component
export interface IpDataContinentProps {
  readonly ip: string;
}

export default async function IpDataContinent({ ip }: IpDataContinentProps) {
  const result = await searchIpData(ip);

  return <>
    { result.continent_name }{' '}
    { result.continent_code && (
      <Box component="span" color="text.secondary">({ result.continent_code })</Box>
    ) }
  </>;
}
