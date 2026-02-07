import AnimalSearchOptions from '@/components/animal/AnimalSearchOptions';
import DnsSearchOptions from '@/components/dns/DnsSearchOptions';
import MapDrawerSurface from '@/components/map/drawer/MapDrawerSurface';
import MapLayout from '@/components/map/MapLayout';
import MapToolbar from '@/components/map/MapToolbar';
import ProfileMenu from '@/components/profile/ProfileMenu';
import ProfileMenuV2 from '@/components/profile/ProfileMenuV2';
import SearchBox from '@/components/search/SearchBox';
import { SearchBoxSkeleton } from '@/components/search/SearchBoxSkeleton';
import ServerSearchOptions from '@/components/server/ServerSearchOptions';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { preconnect, prefetchDNS } from 'react-dom';

// Layout
export default async function WithMapLayout({ children }: LayoutProps<'/'>) {
  preconnect('https://api.mapbox.com', { crossOrigin: 'anonymous' });
  prefetchDNS('https://events.mapbox.com');

  // Render
  return (
    <MapLayout>
      <MapToolbar component="header">
        <Suspense fallback={<SearchBoxSkeleton className="w-96" />}>
          <SearchBox className="w-96">
            <AnimalSearchOptions />
            <DnsSearchOptions />
            <ServerSearchOptions />
          </SearchBox>
        </Suspense>

        <div className="ml-auto p-1 rounded-full elevation-2 overlay-2 bg-background-paper">
          <ProfileMenu />
        </div>

        <ProfileMenuV2 className="ml-2" />
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
