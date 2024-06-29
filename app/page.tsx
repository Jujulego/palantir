import { Box } from '@mui/material';

import MapboxMap from '@/src/mapbox/MapboxMap';
import MapboxNavigationControl from '@/src/mapbox/MapboxNavigationControl';

// Page
export default function Home() {
  return (
    <Box component="main" height="100vh" width="100vw">
      <MapboxMap>
        <MapboxNavigationControl />
      </MapboxMap>
    </Box>
  );
}
