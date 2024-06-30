import { Box, NoSsr } from '@mui/material';

import SearchBar from '@/src/common/SearchBar';
import IpGeolocationCard from '@/src/ip-geolocation/IpGeolocationCard';
import IpGeolocationMarker from '@/src/ip-geolocation/IpGeolocationMarker';
import MapboxMap from '@/src/mapbox/MapboxMap';
import MapboxNavigationControl from '@/src/mapbox/MapboxNavigationControl';

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
      <Box position="absolute" left={16} top={16} zIndex="appBar" width={376}>
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

      { ip && (
        <Box position="absolute" left={16} top={80} zIndex={10} width={376}>
          <IpGeolocationCard ip={ip} />
        </Box>
      ) }
    </Box>
  );
}
