import ColorModeToggle from '@/components/ColorModeToggle';
import LocateButton from '@/components/server/LocateButton';
import MapLayout from '@/components/map/MapLayout';
import AnimalSearchOptions from '@/components/animal/AnimalSearchOptions';
import DnsSearchOptions from '@/components/dns/DnsSearchOptions';
import ServerSearchOptions from '@/components/server/ServerSearchOptions';
import SearchBox from '@/components/search/SearchBox';
import { SearchBoxSkeleton } from '@/components/search/SearchBoxSkeleton';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import { domAnimation, LazyMotion } from 'motion/react';
import type { Metadata } from 'next';
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
        <Suspense fallback={<SearchBoxSkeleton sx={{ width: 384 }} />}>
          <SearchBox sx={{ width: 384 }}>
            <AnimalSearchOptions />
            <DnsSearchOptions />
            <ServerSearchOptions />
          </SearchBox>
        </Suspense>

        <Paper elevation={2} sx={{ ml: 3, p: 0.5, borderRadius: 9999 }}>
          <LocateButton />
        </Paper>

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

export const metadata: Metadata = {
  title: {
    default: 'Palantir',
    template: 'Palantir - %s',
  },
  description: 'Locate websites in the world',
};
