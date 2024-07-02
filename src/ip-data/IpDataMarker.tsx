import { deepPurple } from '@mui/material/colors';

import { searchIpData } from '@/src/ip-data/data';
import MapboxMarker from '@/src/mapbox/MapboxMarker';

// Component
export interface IpDataMarkerProps {
  readonly ip: string;
}

export default async function IpDataMarker({ ip }: IpDataMarkerProps) {
  const result = await searchIpData(ip);

  if (!result.longitude || !result.latitude) {
    return null;
  }

  return (
    <MapboxMarker
      color={deepPurple[300]}
      focusKey="ip-data"
      lngLat={[result.longitude, result.latitude]}
    />
  );
}
