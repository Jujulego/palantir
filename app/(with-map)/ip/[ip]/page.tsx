import MapboxFlyTo from '@/components/mapbox/MapboxFlyTo';
import MapboxMarker from '@/components/mapbox/MapboxMarker';

export default function WithMapIpPage() {
  return <>
    <MapboxMarker latitude={49} longitude={2} />
    <MapboxFlyTo latitude={49} longitude={2} zoom={4} />
  </>;
}
