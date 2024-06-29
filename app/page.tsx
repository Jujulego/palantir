import SearchBar from '@/src/search/SearchBar';
import { Box } from '@mui/material';

import MapboxMap from '@/src/mapbox/MapboxMap';
import MapboxNavigationControl from '@/src/mapbox/MapboxNavigationControl';

// Page
export default function Home() {
  return (
    <Box component="main" position="relative" height="100vh" width="100vw">
      <MapboxMap
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%'
        }}
      >
        <MapboxNavigationControl />
      </MapboxMap>

      <Box position="absolute" top={0} left={0} zIndex="appBar" px={2} py={1.5}>
        <SearchBar />
      </Box>
    </Box>
  );
}
