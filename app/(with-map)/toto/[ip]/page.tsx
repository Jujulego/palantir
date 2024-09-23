import MapboxMarker from '@/components/mapbox/MapboxMarker';
import { fetchIpInfo } from '@/data/ip-info';

// Page
export interface TotoIpPageProps {
  readonly params: {
    readonly ip: string;
  }
}

export default async function TotoIpPage({ params }: TotoIpPageProps) {
  const { location } = await fetchIpInfo(decodeURIComponent(params.ip));

  return location?.coordinates && (
    <MapboxMarker
      lat={location.coordinates.latitude}
      lng={location.coordinates.longitude}
    />
  );
}
