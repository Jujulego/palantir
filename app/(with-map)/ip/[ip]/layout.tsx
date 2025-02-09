import computerPng from '@/assets/computer.png';
import ColoredImage from '@/components/ColoredImage';
import HostnameLink from '@/components/HostnameLink';
import MapDrawer from '@/components/map/MapDrawer';
import SourcesNav from '@/components/SourcesNav';
import { reverseDnsLookup } from '@/data/dns';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ipaddr from 'ipaddr.js';
import type { Metadata } from 'next';
import Link from 'next/link';
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

    <Paper square sx={{ flex: '1 0 auto', pb: 4 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', px: 2.5, py: 2 }}>
        <Typography component="h1" variant="h5" noWrap sx={{ gridColumnStart: 1, gridRowStart: 1 }}>
          { ipaddr.parse(ip).toString() }
        </Typography>

        <Suspense>
          <HostnameLink
            hostname={reverseDnsLookup(ip)}
            sx={{ gridColumnStart: 1, gridRowStart: 2, color: 'text.secondary' }}
          />
        </Suspense>

        <IconButton
          component={Link}
          href=".."
          sx={{ gridColumnStart: 2, gridRowStart: 1, gridRowEnd: 3, alignSelf: 'start', mt: -1, mr: -1.5 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <SourcesNav />

      { children }
    </Paper>
  </MapDrawer>;
}
