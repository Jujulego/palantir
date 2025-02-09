import HostnameLink from '@/components/HostnameLink';
import SourcesNav from '@/components/SourcesNav';
import { reverseDnsLookup } from '@/data/dns';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
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
    <Paper square sx={{ flex: '1 0 auto', pb: 4 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', px: 2.5, py: 2 }}>
        <Typography component="h1" variant="h5" noWrap sx={{ gridColumnStart: 1, gridRowStart: 1 }}>
          { ipaddr.parse(ip).toString() }
        </Typography>

        <Suspense fallback={<Skeleton height={20} width="75%" />}>
          <HostnameLink hostname={reverseDnsLookup(ip)} />
        </Suspense>

        <IconButton
          component={Link}
          href=".."
          sx={{ gridColumnStart: 2, gridRowStart: 1, gridRowEnd: 3, alignSelf: 'start', mt: -1, mr: -1.5 }}
          aria-label="Close panel"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <SourcesNav />

      { children }
    </Paper>
  );
}

export async function generateMetadata({ params }: WithMapServerIpLayoutProps): Promise<Metadata> {
  return {
    title: await decodeIp(params),
  };
}
