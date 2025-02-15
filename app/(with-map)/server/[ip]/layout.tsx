import HostnameLink from '@/components/HostnameLink';
import IpSourceMenu from '@/components/IpSourceMenu';
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

          <IpSourceMenu ip={ip} sx={{ flex: '0 0 auto', ml: 'auto' }} />
        </Box>
      </Box>

      <Divider />

      { children }
    </>
  );
}

export async function generateMetadata({ params }: WithMapServerIpLayoutProps): Promise<Metadata> {
  return {
    title: await decodeIp(params),
  };
}
