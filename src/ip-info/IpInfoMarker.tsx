import { green } from '@mui/material/colors';

import { searchIpInfo } from '@/src/ip-info/data';
import MapboxMarker from '@/src/mapbox/MapboxMarker';

// Component
export interface IpInfoMarkerProps {
  readonly ip: string;
}

export default async function IpInfoMarker({ ip }: IpInfoMarkerProps) {
  const result = await searchIpInfo(ip);

  if (!result.loc) {
    return null;
  }

  const [latitude, longitude] = result.loc.split(',');

  return (
    <MapboxMarker
      color={green[300]}
      focusKey="ip-info"
      lngLat={[parseFloat(longitude), parseFloat(latitude)]}
    />
  );
}
