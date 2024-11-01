import computerPng from '@/assets/computer.png';
import { auth0 } from '@/auth0';
import ColoredImage from '@/components/common/ColoredImage';
import SourcesNav from '@/components/sources/SourcesNav';
import { reverseDnsLookup } from '@/data/dns';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ipaddr from 'ipaddr.js';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

export interface WithMapIpLayoutProps {
  readonly children: ReactNode;
  readonly params: Promise<{
    readonly ip: string;
  }>;
}

export default async function WithMapIpLayout({ children, params }: WithMapIpLayoutProps) {
  const ip = decodeURIComponent((await params).ip);

  if (!ipaddr.isValid(ip)) {
    redirect('/');
  }

  if (!await auth0.getSession()) {
    redirect(`/auth/login?returnTo=${encodeURIComponent(`/ip/${ip}`)}`);
  }

  return (<>
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
        <Typography component="h1" variant="h5">{ ipaddr.parse(ip).toString() }</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{ await reverseDnsLookup(ip) }</Typography>
      </Box>

      <Divider />

      <SourcesNav />

      { children }
    </Paper>
  </>);
}
