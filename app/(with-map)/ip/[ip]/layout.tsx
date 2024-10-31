import computerPng from '@/assets/computer.png';
import { auth0 } from '@/auth0';
import ColoredImage from '@/components/common/ColoredImage';
import Box from '@mui/material/Box';
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

    { children }
  </>);
}
