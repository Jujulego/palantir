import { pink } from '@mui/material/colors';

import { searchBigDataCloud } from '@/src/big-data-cloud/data';
import MapboxMarker from '@/src/mapbox/MapboxMarker';

// Component
export interface BigDataCloudMarkerProps {
  readonly ip: string;
}

export default async function BigDataCloudMarker({ ip }: BigDataCloudMarkerProps) {
  const result = await searchBigDataCloud(ip);

  if (!result.location) {
    return null;
  }

  return (
    <MapboxMarker
      color={pink[300]}
      focusKey="big-data-cloud"
      lngLat={[result.location.longitude, result.location.latitude]}
    />
  );
}
