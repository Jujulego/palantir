import ColorModeToggle from '@/components/ColorModeToggle';
import LocateButton from '@/components/LocateButton';
import MapLayout from '@/components/map/MapLayout';
import AnimalSearchOptions from '@/components/search/AnimalSearchOptions';
import IpSearchOptions from '@/components/search/IpSearchOptions';
import SearchBox from '@/components/search/SearchBox';
import { Toolbar } from '@mui/material';
import Paper from '@mui/material/Paper';
import ipaddr from 'ipaddr.js';
import { domAnimation, LazyMotion } from 'motion/react';
import { headers } from 'next/headers';
import { type ReactNode, Suspense } from 'react';

// Layout
export interface WithMapLayoutProps {
  readonly children: ReactNode;
}

export default async function WithMapLayout({ children }: WithMapLayoutProps) {
  // Render
  return (
    <LazyMotion features={domAnimation} strict>
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
        <SearchBox sx={{ width: 384 }}>
          <AnimalSearchOptions />
          <IpSearchOptions />
        </SearchBox>

        <Suspense>
          <LocateButton ip={clientIp()} sx={{ ml: 3 }} />
        </Suspense>

        <Paper elevation={2} sx={{ ml: 'auto', p: 0.5, borderRadius: 9999 }}>
          <ColorModeToggle />
        </Paper>
      </Toolbar>

      <MapLayout>
        { children }
      </MapLayout>
    </LazyMotion>
  );
}

// Utils
async function clientIp() {
  const ip = (await headers()).get('X-Forwarded-For');

  if (ip !== null) {
    return ipaddr.parse(ip).toString();
  }

  return null;
}
