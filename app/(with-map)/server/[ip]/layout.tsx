import RightGate from '@/components/auth/RightGate';
import HostnameLink from '@/components/dns/HostnameLink';
import MapDrawerHeader from '@/components/map/drawer/MapDrawerHeader';
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
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import ipaddr from 'ipaddr.js';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect, RedirectType } from 'next/navigation';
import { type ReactNode, Suspense } from 'react';
import { decodeIp, type WithMapServerIpParams } from './params';

// Layout
export interface WithMapServerIpLayoutProps {
  readonly children: ReactNode;
  readonly params: Promise<WithMapServerIpParams>;
}

export default async function WithMapServerIpLayout({ params, children }: WithMapServerIpLayoutProps) {
  const ip = await decodeIp(params);

  if (!ipaddr.isValid(ip)) {
    redirect('/', RedirectType.replace);
  }

  // Render
  const ipUrl = `/server/${encodeURIComponent(ip)}`;

  return (
    <>
      <MapDrawerHeader sx={{ position: 'relative' }}>
        <Box sx={{ display: 'flex', pl: 2.5, pr: 1, pt: 2 }}>
          <Typography component="h1" variant="h5" noWrap sx={{ flex: 1 }}>
            { ipaddr.parse(ip).toString() }
          </Typography>

          <IconButton
            component={Link}
            href="/"
            sx={{ flex: '0 0 auto', mt: -1 }}
            aria-label="Close panel"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', pl: 2.5, pr: 1.5, pb: 2, alignItems: 'center' }}>
          <Suspense fallback={<Skeleton height={20} width="75%" />}>
            <HostnameLink hostname={reverseDnsLookup(ip)} sx={{ flex: 1 }} />
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
        </Box>
      </MapDrawerHeader>

      <Divider />

      <ServerMarkers>
        { children }
      </ServerMarkers>
    </>
  );
}

export async function generateMetadata({ params }: WithMapServerIpLayoutProps): Promise<Metadata> {
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
