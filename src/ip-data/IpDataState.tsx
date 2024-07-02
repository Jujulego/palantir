import { Box } from '@mui/material';

import { searchIpData } from '@/src/ip-data/data';

// Component
export interface IpDataStateProps {
  readonly ip: string;
}

export default async function IpDataState({ ip }: IpDataStateProps) {
  const result = await searchIpData(ip);

  return <>
    { result.region }{' '}
    { result.region_code && (
      <Box component="span" color="text.secondary">({ result.region_code })</Box>
    ) }
  </>;
}
