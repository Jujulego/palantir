import BigDataCloudArea from '@/src/big-data-cloud/BigDataCloudArea';
import BigDataCloudCard from '@/src/big-data-cloud/BigDataCloudCard';
import BigDataCloudMarker from '@/src/big-data-cloud/BigDataCloudMarker';
import { Box } from '@mui/material';
import { headers } from 'next/headers';
import { Suspense } from 'react';

import ColorModeToggle from '@/src/common/ColorModeToggle';
import SearchBar from '@/src/common/SearchBar';
import IpGeolocationCard from '@/src/ip-geolocation/IpGeolocationCard';
import IpGeolocationMarker from '@/src/ip-geolocation/IpGeolocationMarker';
import IpInfoCard from '@/src/ip-info/IpInfoCard';
import IpInfoMarker from '@/src/ip-info/IpInfoMarker';
import MapboxMap from '@/src/mapbox/MapboxMap';
import MapboxNavigationControl from '@/src/mapbox/MapboxNavigationControl';
import MapboxTheme from '@/src/mapbox/MapboxTheme';

// Page
export interface HomeProps {
  readonly searchParams: {
    readonly ip?: string;
  }
}

export default function Home(props: HomeProps) {
  const { ip = headers().get('X-Forwarded-For') } = props.searchParams;

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
          <Suspense>
            <BigDataCloudArea ip={ip} />
            <BigDataCloudMarker ip={ip} />
            <IpGeolocationMarker ip={ip} />
            <IpInfoMarker ip={ip} />
          </Suspense>
        ) }
      </MapboxMap>

      { ip && (
        <Box
          position="absolute" left={16} top={80} zIndex={10} width={376}
          display="flex" flexDirection="column" gap={1}
        >
          <IpGeolocationCard ip={ip} />
          <BigDataCloudCard ip={ip} />
          <IpInfoCard ip={ip} />
        </Box>
      ) }
    </Box>
  );
}
