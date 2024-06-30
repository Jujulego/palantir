import { Box, NoSsr } from '@mui/material';

import IpGeolocationMarker from '@/src/ip-geolocation/IpGeolocationMarker';
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
    <Box component="main" display="flex" flexDirection="column" position="relative" height="100vh" width="100vw">
      <Box position="absolute" top={12} left={16} zIndex="appBar">
        <SearchBar />
      </Box>

      <MapboxMap sx={{ flex: 1 }}>
        <NoSsr>
          <MapboxNavigationControl />
        </NoSsr>

        { ip && (
          <IpGeolocationMarker ip={ip} />
        ) }
      </MapboxMap>
    </Box>
  );
}
