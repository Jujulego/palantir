import ColorModeToggle from '@/components/common/ColorModeToggle';
import MapboxMap from '@/components/mapbox/MapboxMap';
import { Toolbar } from '@mui/material';
import Paper from '@mui/material/Paper';
import type { ReactNode } from 'react';

// Layout
export interface WithMapLayoutProps {
  readonly children: ReactNode;
}

export default function WithMapLayout({ children }: WithMapLayoutProps) {
  return <>
    <Toolbar
      component="header"
      sx={{
        flexShrink: 0,
        zIndex: 'appBar',
        pointerEvents: 'none',

        '& > *': {
          pointerEvents: 'auto',
        }
      }}
    >
      <Paper sx={{ ml: 'auto', p: 0.5, borderRadius: 9999 }}>
        <ColorModeToggle />
      </Paper>
    </Toolbar>

    <MapboxMap>
      { children }
    </MapboxMap>
  </>;
}