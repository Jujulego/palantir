import HostnameLink from '@/components/dns/HostnameLink';
import MetadataSourceMenu from '@/components/server/MetadataSourceMenu';
import ServerMarkers from '@/components/server/ServerMarkers';
import { reverseDnsLookup } from '@/lib/dns/reverse-dns-lookup';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import ipaddr from 'ipaddr.js';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { type ReactNode, Suspense } from 'react';

// Page
export interface WithMapServerMeLayoutProps {
  readonly children: ReactNode;
}

export default async function WithMapServerMeLayout({ children }: WithMapServerMeLayoutProps) {
  const forwardedFor = (await headers()).get('x-forwarded-for');

  if (forwardedFor === null || !ipaddr.isValid(forwardedFor)) {
    redirect('/');
  }

  // Load data
  const ip = ipaddr.parse(forwardedFor);

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ display: 'flex', pl: 2.5, pr: 1, pt: 2 }}>
          <Typography component="h1" variant="h5" noWrap sx={{ flex: 1 }}>
            { ip.toString() }
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
            <HostnameLink hostname={reverseDnsLookup(forwardedFor)} sx={{ flex: 1 }} />
          </Suspense>

          <MetadataSourceMenu ip="me" sx={{ flex: '0 0 auto', ml: 'auto' }} />
        </Box>
      </Box>

      <Divider />

      <ServerMarkers>
        { children }
      </ServerMarkers>
    </>
  );
}
