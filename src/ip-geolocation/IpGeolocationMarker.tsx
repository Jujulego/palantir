import { blue } from '@mui/material/colors';

import { searchIpGeolocation } from '@/src/ip-geolocation/data';
import MapboxGate from '@/src/mapbox/MapboxGate';
import MapboxMarker from '@/src/mapbox/MapboxMarker';

// Component
export interface IpGeolocationMarkerProps {
  readonly ip: string;
}

export default async function IpGeolocationMarker({ ip }: IpGeolocationMarkerProps) {
  const result = await searchIpGeolocation(ip);

  if (!result.latitude || !result.longitude) {
    return null;
  }

  return (
    <MapboxGate>
      <MapboxMarker
        color={blue[300]}
        focusKey="ip-geolocation"
        lngLat={[parseFloat(result.longitude), parseFloat(result.latitude)]}
      />
    </MapboxGate>
  );
}
