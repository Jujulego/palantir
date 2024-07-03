import { Box } from '@mui/material';
import { headers } from 'next/headers';
import { Suspense } from 'react';

import BigDataCloudArea from '@/src/big-data-cloud/BigDataCloudArea';
import BigDataCloudCard from '@/src/big-data-cloud/BigDataCloudCard';
import BigDataCloudMarker from '@/src/big-data-cloud/BigDataCloudMarker';
import ColorModeToggle from '@/src/common/ColorModeToggle';
import SearchBar from '@/src/common/SearchBar';
import IpDataCard from '@/src/ip-data/IpDataCard';
import IpDataMarker from '@/src/ip-data/IpDataMarker';
import IpGeolocationCard from '@/src/ip-geolocation/IpGeolocationCard';
import IpGeolocationMarker from '@/src/ip-geolocation/IpGeolocationMarker';
import IpInfoCard from '@/src/ip-info/IpInfoCard';
import IpInfoMarker from '@/src/ip-info/IpInfoMarker';
import IpQualityCard from '@/src/ip-quality/IpQualityCard';
import IpQualityMarker from '@/src/ip-quality/IpQualityMarker';
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
      <MapboxMap sx={{ flex: 1 }}>
        <MapboxTheme />
        <MapboxNavigationControl />

        { ip && (
          <Suspense>
            <BigDataCloudArea ip={ip} />
            <BigDataCloudMarker ip={ip} />
            <IpDataMarker ip={ip} />
            <IpGeolocationMarker ip={ip} />
            <IpQualityMarker ip={ip} />
            <IpInfoMarker ip={ip} />
          </Suspense>
        ) }
      </MapboxMap>

      <Box
        sx={{
          position: 'absolute',
          top: 0, left: 0, zIndex: 10,
          height: '100%', width: '100%',
          overflow: 'hidden',
          pointerEvents: 'none',

          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr auto',
            sm: '376px auto 1fr',
          },
          gridTemplateRows: {
            xs: 'auto 272px 1fr',
            sm: 'auto 1fr',
          },

          pt: 2,
          px: 2,
          gap: 2,
        }}
      >
        <SearchBar sx={{ gridArea: '1 / 1', pointerEvents: 'auto' }} />

        <ColorModeToggle sx={{ gridArea: '1 / 2', pointerEvents: 'auto' }} />

        { ip && (
          <Box
            sx={{
              display: 'flex', flexDirection: 'column', gap: 1,
              p: 0.25,
              gridArea: {
                xs: '2 / 1 / 2 / span 2',
                sm: '2 / 1',
              },
              overflow: 'auto',
            }}
          >
            <IpGeolocationCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} />
            <BigDataCloudCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} />
            <IpDataCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} />
            <IpQualityCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} />
            <IpInfoCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} />
          </Box>
        ) }
      </Box>
    </Box>
  );
}
