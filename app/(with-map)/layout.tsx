import AnimalSearchOptions from '@/components/animal/AnimalSearchOptions';
import DnsSearchOptions from '@/components/dns/DnsSearchOptions';
import MapLayout from '@/components/map/MapLayout';
import ProfileMenu from '@/components/profile/ProfileMenu';
import SearchBox from '@/components/search/SearchBox';
import { SearchBoxSkeleton } from '@/components/search/SearchBoxSkeleton';
import ServerSearchOptions from '@/components/server/ServerSearchOptions';
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
          pl: 1.5,
          pr: 2.5,
          py: 1,
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

        <Paper elevation={2} sx={{ ml: 'auto', p: 0.5, borderRadius: 9999 }}>
          <ProfileMenu />
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
  description: 'One map to locate them all',
  openGraph: {
    title: {
      default: 'Palantir',
      template: 'Palantir - %s',
    },
    description: 'One map to locate them all',
  },
};
