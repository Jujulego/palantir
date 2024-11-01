import ColorModeToggle from '@/components/common/ColorModeToggle';
import LocateButton from '@/components/common/LocateButton';
import SearchBox from '@/components/common/SearchBox';
import MapboxMap from '@/components/mapbox/MapboxMap';
import { Toolbar } from '@mui/material';
import Paper from '@mui/material/Paper';
import { type ReactNode } from 'react';

// Layout
export interface WithMapLayoutProps {
  readonly children: ReactNode;
}

export default function WithMapLayout({ children }: WithMapLayoutProps) {
  return <>
    <Toolbar
      component="header"
      disableGutters
      sx={{
        flexShrink: 0,
        zIndex: 'appBar',
        p: 1.5,
        pointerEvents: 'none',

        '& > *': {
          pointerEvents: 'auto',
        }
      }}
    >
      <SearchBox />

      <Paper elevation={2} sx={{ ml: 3, p: 0.5, borderRadius: 9999 }}>
        <LocateButton />
      </Paper>

      <Paper elevation={2} sx={{ ml: 'auto', p: 0.5, borderRadius: 9999 }}>
        <ColorModeToggle />
      </Paper>
    </Toolbar>

    <MapboxMap>
      { children }
    </MapboxMap>
  </>;
}
