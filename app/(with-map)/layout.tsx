import AnimalSearchOptions from '@/components/animal/AnimalSearchOptions';
import DnsSearchOptions from '@/components/dns/DnsSearchOptions';
import MapDrawerSurface from '@/components/map/drawer/MapDrawerSurface';
import MapLayout from '@/components/map/MapLayout';
import MapToolbar from '@/components/map/MapToolbar';
import ProfileMenu from '@/components/profile/ProfileMenu';
import SearchBox from '@/components/search/SearchBox';
import { SearchBoxSkeleton } from '@/components/search/SearchBoxSkeleton';
import ServerSearchOptions from '@/components/server/ServerSearchOptions';
import Paper from '@mui/material/Paper';
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
      <MapLayout>
        <MapToolbar component="header">
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
        </MapToolbar>

        <MapDrawerSurface>
          { children }
        </MapDrawerSurface>
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
