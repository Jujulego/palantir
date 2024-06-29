import { Box } from '@mui/material';

import IpGeolocation from '@/src/ip-geolocation/IpGeolocation';
import MapboxMap from '@/src/mapbox/MapboxMap';
import MapboxNavigationControl from '@/src/mapbox/MapboxNavigationControl';
import SearchBar from '@/src/search/SearchBar';

// Page
export interface HomeProps {
  readonly searchParams: {
    readonly ip?: string;
  }
}

export default function Home(props: HomeProps) {
  const { ip } = props.searchParams;

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

        { ip && (
          <IpGeolocation ip={ip} />
        ) }
      </MapboxMap>

      <Box position="absolute" top={0} left={0} zIndex="appBar" px={2} py={1.5}>
        <SearchBar />
      </Box>
    </Box>
  );
}
