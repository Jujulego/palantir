import MapboxMarker from '@/components/mapbox/MapboxMarker';
import MapboxSpin from '@/components/mapbox/MapboxSpin';

// Page
export default function RootPage() {
  return <>
    <MapboxSpin />
    <MapboxMarker latitude={49} longitude={2} />
  </>;
}