import { searchIpGeolocation } from '@/src/ip-geolocation/data';
import { Chip, type SxProps } from '@mui/material';

// Component
export interface IpGeolocationConnectionTypeProps {
  readonly ip: string;
  readonly sx?: SxProps;
}

export default async function IpGeolocationConnectionType({ ip, sx }: IpGeolocationConnectionTypeProps) {
  const result = await searchIpGeolocation(ip);

  if (!result.connection_type) {
    return null;
  } else {
    return <Chip label={result.connection_type} size="small" sx={sx} />;
  }
}
