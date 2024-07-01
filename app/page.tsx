import { Box } from '@mui/material';
import { Suspense } from 'react';

import ColorModeToggle from '@/src/common/ColorModeToggle';
import SearchBar from '@/src/common/SearchBar';
import IpGeolocationCard from '@/src/ip-geolocation/IpGeolocationCard';
import IpGeolocationMarker from '@/src/ip-geolocation/IpGeolocationMarker';
import MapboxMap from '@/src/mapbox/MapboxMap';
import MapboxNavigationControl from '@/src/mapbox/MapboxNavigationControl';
import { MapboxTheme } from '@/src/mapbox/MapboxTheme';

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
      <Box position="absolute" left={16} top={16} zIndex="appBar" display="flex">
        <SearchBar sx={{ width: 376 }} />

        <ColorModeToggle sx={{ ml: 2 }} />
      </Box>

      <MapboxMap sx={{ flex: 1 }}>
        <MapboxTheme />
        <MapboxNavigationControl />

        { ip && (
          <IpGeolocationMarker ip={ip} />
        ) }
      </MapboxMap>

      { ip && (
        <Box position="absolute" left={16} top={80} zIndex={10} width={376}>
          <Suspense>
            <IpGeolocationCard ip={ip} />
          </Suspense>
        </Box>
      ) }
    </Box>
  );
}
