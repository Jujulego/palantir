import computerPng from '@/assets/computer.png';
import ColoredImage from '@/components/ColoredImage';
import SourcesNav from '@/components/SourcesNav';
import { reverseDnsLookup } from '@/data/dns';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ipaddr from 'ipaddr.js';
import Link from 'next/link';
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

  const name = await reverseDnsLookup(ip);

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
        <MuiLink
          component={Link}
          href={`?search=${name}`}
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >
          { name }
        </MuiLink>
      </Box>

      <Divider />

      <SourcesNav />

      { children }
    </Paper>
  </>);
}
