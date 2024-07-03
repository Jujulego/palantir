import { yellow } from '@mui/material/colors';

import { searchIpQuality } from '@/src/ip-quality/data';
import MapboxMarker from '@/src/mapbox/MapboxMarker';

// Component
export interface IpQualityMarkerProps {
  readonly ip: string;
}

export default async function IpQualityMarker({ ip }: IpQualityMarkerProps) {
  const result = await searchIpQuality(ip);

  if (!result.latitude || !result.longitude) {
    return null;
  }

  return (
    <MapboxMarker
      color={yellow[300]}
      focusKey="ip-quality"
      lngLat={[result.longitude, result.latitude]}
    />
  );
}
