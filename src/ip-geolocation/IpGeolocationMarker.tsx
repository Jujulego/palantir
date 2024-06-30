import { NoSsr } from '@mui/material';

import { searchIpGeolocation } from '@/src/ip-geolocation/data';
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
    <NoSsr>
      <MapboxMarker lngLat={[parseFloat(result.longitude), parseFloat(result.latitude)]} flyTo />
    </NoSsr>
  );
}
