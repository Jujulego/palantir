import computerPng from '@/assets/computer.png';
import ColoredImage from '@/components/ColoredImage';
import HostnameLink from '@/components/HostnameLink';
import MapDrawer from '@/components/map/MapDrawer';
import SourcesNav from '@/components/SourcesNav';
import { reverseDnsLookup } from '@/data/dns';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ipaddr from 'ipaddr.js';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { type ReactNode, Suspense } from 'react';

export interface WithMapIpLayoutProps {
  readonly children: ReactNode;
  readonly params: Promise<{
    readonly ip: string;
  }>;
}

export async function generateMetadata({ params }: WithMapIpLayoutProps): Promise<Metadata> {
  return {
    title: decodeURIComponent((await params).ip),
  };
}

export default async function WithMapIpLayout({ children, params }: WithMapIpLayoutProps) {
  const ip = decodeURIComponent((await params).ip);

  if (!ipaddr.isValid(ip)) {
    redirect('/');
  }

  return <MapDrawer>
    <Box
      sx={{
        position: 'relative',
        height: 230,
        flexShrink: 0,
        color: 'action.selected',
      }}
    >
      <ColoredImage
        src={computerPng}
        alt="computer"
        style={{ position: 'absolute', bottom: 0, left: 'calc(50% - 75px)', height: 'auto', width: 150 }}
      />
    </Box>

    <Paper component="main" square sx={{ flex: '1 0 auto', pb: 4 }}>
      <Box sx={{ px: 2.5, py: 2 }}>
        <Typography component="h1" variant="h5" noWrap>{ ipaddr.parse(ip).toString() }</Typography>
        <Suspense>
          <HostnameLink hostname={reverseDnsLookup(ip)} />
        </Suspense>
      </Box>

      <Divider />

      <SourcesNav />

      { children }
    </Paper>
  </MapDrawer>;
}
