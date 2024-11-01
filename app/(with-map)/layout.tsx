import ColorModeToggle from '@/components/common/ColorModeToggle';
import LocateButton from '@/components/common/LocateButton';
import SearchBox from '@/components/common/SearchBox';
import MapboxMap from '@/components/mapbox/MapboxMap';
import { Toolbar } from '@mui/material';
import Paper from '@mui/material/Paper';
import ipaddr from 'ipaddr.js';
import { headers } from 'next/headers';
import { type ReactNode } from 'react';

// Layout
export interface WithMapLayoutProps {
  readonly children: ReactNode;
}

export default async function WithMapLayout({ children }: WithMapLayoutProps) {
  const ip = await clientIp();

  // Render
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

      { ip && (
        <Paper elevation={2} sx={{ ml: 3, p: 0.5, borderRadius: 9999 }}>
          <LocateButton ip={ip} />
        </Paper>
      ) }

      <Paper elevation={2} sx={{ ml: 'auto', p: 0.5, borderRadius: 9999 }}>
        <ColorModeToggle />
      </Paper>
    </Toolbar>

    <MapboxMap>
      { children }
    </MapboxMap>
  </>;
}

// Utils
async function clientIp() {
  const ip = (await headers()).get('X-Forwarded-For');

  if (ip !== null) {
    return ipaddr.parse(ip).toString();
  }

  return null;
}
