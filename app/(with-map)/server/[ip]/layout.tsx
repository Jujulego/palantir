import HostnameLink from '@/components/dns/HostnameLink';
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

  return (
    <>
      <Box sx={{ position: 'relative' }}>
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
            <MetadataOption href={`/server/${encodeURIComponent(ip)}/ip-info`}><IpInfoOption /></MetadataOption>
            <MetadataOption href={`/server/${encodeURIComponent(ip)}/ip-data`}><IpDataOption /></MetadataOption>
            <MetadataOption href={`/server/${encodeURIComponent(ip)}/ip-geolocation`}><IpGeolocationOption /></MetadataOption>
            <MetadataOption href={`/server/${encodeURIComponent(ip)}/ip-quality-score`}><IpQualityScoreOption /></MetadataOption>
            <MetadataOption href={`/server/${encodeURIComponent(ip)}/big-data-cloud`}><BigDataCloudOption /></MetadataOption>
          </MetadataMenu>
        </Box>
      </Box>

      <Divider />

      <ServerMarkers>
        { children }
      </ServerMarkers>
    </>
  );
}

export async function generateMetadata({ params }: WithMapServerIpLayoutProps): Promise<Metadata> {
  return {
    title: await decodeIp(params),
  };
}
