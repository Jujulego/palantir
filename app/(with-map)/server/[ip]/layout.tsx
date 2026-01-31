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
import ServerMarkers from '@/components/server/ServerMarkers';
import { reverseDnsLookup } from '@/lib/dns/reverse-dns-lookup';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import ipaddr from 'ipaddr.js';
import type { Metadata } from 'next';
import { redirect, RedirectType } from 'next/navigation';
import { Suspense } from 'react';
import { decodeIp } from './params';

// Layout
export default async function WithMapServerIpLayout({ params, children }: LayoutProps<'/server/[ip]'>) {
  const ip = await decodeIp(params);

  if (!ipaddr.isValid(ip)) {
    redirect('/', RedirectType.replace);
  }

  // Render
  const ipUrl = `/server/${encodeURIComponent(ip)}`;

  return (
    <>
      <MapDrawerHeader>
        <div className="flex pl-5 pr-2 pt-4">
          <h1 className="typography-h5 flex-1 text-ellipsis overflow-hidden">
            { ipaddr.parse(ip).toString() }
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
            <HostnameLink className="grow-0 shrink-0 basis-auto" hostname={reverseDnsLookup(ip)} />
          </Suspense>

          <MetadataMenu sx={{ flex: '0 0 auto', ml: 'auto' }}>
            <MetadataOption href={`${ipUrl}/ip-info`}><IpInfoOption /></MetadataOption>
            <RightGate right="ip:AccessIpData">
              <MetadataOption href={`${ipUrl}/ip-data`}><IpDataOption /></MetadataOption>
            </RightGate>
            <RightGate right="ip:AccessIpGeolocation">
              <MetadataOption href={`${ipUrl}/ip-geolocation`}><IpGeolocationOption /></MetadataOption>
            </RightGate>
            <RightGate right="ip:AccessIpQualityScore">
              <MetadataOption href={`${ipUrl}/ip-quality-score`}><IpQualityScoreOption /></MetadataOption>
            </RightGate>
            <RightGate right="ip:AccessBigDataCloud">
              <MetadataOption href={`${ipUrl}/big-data-cloud`}><BigDataCloudOption /></MetadataOption>
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

export async function generateMetadata({ params }: LayoutProps<'/server/[ip]'>): Promise<Metadata> {
  const ip = await decodeIp(params);

  return {
    title: ip,
    description: 'Locate websites in the world',
    openGraph: {
      title: ip,
      description: 'Locate websites in the world',
    }
  };
}
