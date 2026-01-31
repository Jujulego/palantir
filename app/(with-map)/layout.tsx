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
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { preconnect, prefetchDNS } from 'react-dom';

// Layout
export default async function WithMapLayout({ children }: LayoutProps<'/'>) {
  preconnect('https://api.mapbox.com', { crossOrigin: 'anonymous'});
  prefetchDNS('https://events.mapbox.com');

  // Render
  return (
    <MapLayout>
      <MapToolbar component="header">
        <Suspense fallback={<SearchBoxSkeleton sx={{ width: 384 }} />}>
          <SearchBox className="w-96">
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
  );
}

export const metadata: Metadata = {
  title: {
    default: 'Palantir',
    template: 'Palantir - %s',
  },
  openGraph: {
    title: {
      default: 'Palantir',
      template: 'Palantir - %s',
    },
  },
};
