import RightGate from '@/components/auth/RightGate';
import HostnameLink from '@/components/dns/HostnameLink';
import MapDrawerHeader from '@/components/map/drawer/MapDrawerHeader';
import IconLink from '@/components/mui/IconLink';
import BigDataCloudOption from '@/components/server/menu/BigDataCloudOption';
import IpDataOption from '@/components/server/menu/IpDataOption';
import IpGeolocationOption from '@/components/server/menu/IpGeolocationOption';
import IpInfoOption from '@/components/server/menu/IpInfoOption';
import IpQualityScoreOption from '@/components/server/menu/IpQualityScoreOption';
import MetadataMenu from '@/components/server/menu/MetadataMenu';
import MetadataOption from '@/components/server/menu/MetadataOption';
import VercelOption from '@/components/server/menu/VercelOption';
import ServerMarkers from '@/components/server/ServerMarkers';
import { reverseDnsLookup } from '@/lib/dns/reverse-dns-lookup';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import ipaddr from 'ipaddr.js';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

// Page
export default async function WithMapServerMeLayout({ children }: LayoutProps<'/server/me'>) {
  const forwardedFor = (await headers()).get('x-forwarded-for');

  if (forwardedFor === null || !ipaddr.isValid(forwardedFor)) {
    redirect('/');
  }

  // Render
  const ip = ipaddr.parse(forwardedFor);

  return (
    <>
      <MapDrawerHeader>
        <div className="flex pl-5 pr-2 pt-4">
          <h1 className="typography-h5 overflow-hidden text-ellipsis flex-1">
            { ip.toString() }
          </h1>

          <IconLink
            href="/"
            sx={{ flex: '0 0 auto', mt: -1 }}
            aria-label="Close panel"
          >
            <CloseIcon />
          </IconLink>
        </div>

        <div className="flex pl-5 pr-3 pb-4 items-center">
          <Suspense fallback={<Skeleton height={20} width="75%" />}>
            <HostnameLink className="grow-0 shrink-0 basis-auto" hostname={reverseDnsLookup(forwardedFor)} />
          </Suspense>

          <MetadataMenu sx={{ flex: '0 0 auto', ml: 'auto' }}>
            <MetadataOption href="/server/me/vercel"><VercelOption /></MetadataOption>
            <MetadataOption href="/server/me/ip-info"><IpInfoOption /></MetadataOption>
            <RightGate right="ip:AccessIpData">
              <MetadataOption href="/server/me/ip-data"><IpDataOption /></MetadataOption>
            </RightGate>
            <RightGate right="ip:AccessIpGeolocation">
              <MetadataOption href="/server/me/ip-geolocation"><IpGeolocationOption /></MetadataOption>
            </RightGate>
            <RightGate right="ip:AccessIpQualityScore">
              <MetadataOption href="/server/me/ip-quality-score"><IpQualityScoreOption /></MetadataOption>
            </RightGate>
            <RightGate right="ip:AccessBigDataCloud">
              <MetadataOption href="/server/me/big-data-cloud"><BigDataCloudOption /></MetadataOption>
            </RightGate>
          </MetadataMenu>
        </div>
      </MapDrawerHeader>

      <Divider />

      <div className="grow shrink-0 basis-0 overflow-auto">
        <ServerMarkers>
          { children }
        </ServerMarkers>
      </div>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'My IP address',
    description: 'Locate your IP address',
    openGraph: {
      title: 'My IP address',
      description: 'Locate your IP address',
    }
  };
}
