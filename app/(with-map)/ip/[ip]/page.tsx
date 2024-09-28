import MapboxFlyTo from '@/components/mapbox/MapboxFlyTo';
import MapboxMarker from '@/components/mapbox/MapboxMarker';
import MapboxSpin from '@/components/mapbox/MapboxSpin';
import { fetchIpInfo } from '@/data/sources/ip-info';

// Page
export interface TotoIpPageProps {
  readonly params: {
    readonly ip: string;
  }
}

export default async function WithMapIpPage({ params }: TotoIpPageProps) {
  const { location } = await fetchIpInfo(decodeURIComponent(params.ip));

  if (!location?.coordinates) {
    return <MapboxSpin />
  }

  return <>
    <MapboxMarker latitude={location.coordinates.latitude} longitude={location.coordinates.longitude} />
    <MapboxFlyTo latitude={location.coordinates.latitude} longitude={location.coordinates.longitude} zoom={5} />
  </>;
}
