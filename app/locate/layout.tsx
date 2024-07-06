import { MapboxGate } from '@/src/mapbox/MapboxGate';
import Box from '@mui/material/Box';
import { ReactNode } from 'react';

import ColorModeToggle from '@/src/common/ColorModeToggle';
import SearchBar from '@/src/common/SearchBar';
import MapboxFocusProvider from '@/src/mapbox/MapboxFocusProvider';
import MapboxMap from '@/src/mapbox/MapboxMap';
import MapboxNavigationControl from '@/src/mapbox/MapboxNavigationControl';
import MapboxTheme from '@/src/mapbox/MapboxTheme';

// Layout
export interface LocateLayoutProps {
  readonly children: ReactNode;
}

export default function LocateLayout({ children }: LocateLayoutProps) {
  return (
    <Box component="main" display="flex" flexDirection="column" position="relative" height="100vh" width="100vw">
      <MapboxFocusProvider initialFocusKey="ip-geolocation">
        <MapboxMap sx={{ flex: 1 }}>
          <MapboxGate>
            <MapboxTheme />
            <MapboxNavigationControl />
          </MapboxGate>

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
            <ColorModeToggle sx={{ gridArea: '1 / 2', pointerEvents: 'auto', mb: 'auto' }} />

            { children }
          </Box>
        </MapboxMap>
      </MapboxFocusProvider>
    </Box>
  );
}
