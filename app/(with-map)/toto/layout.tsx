'use client';

import ColorModeToggle from '@/components/common/ColorModeToggle';
import IpSearchBar from '@/components/common/IpSearchBar';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import { type ReactNode, useCallback, useMemo } from 'react';

// Component
export interface TotoLayoutProps {
  readonly children: ReactNode;
}

export default function TotoLayout({ children }: TotoLayoutProps) {
  const segments = useSelectedLayoutSegments();
  const router = useRouter();

  const ip = useMemo(() => segments[0] && decodeURIComponent(segments[0]), [segments[0]]);
  const handleSearch = useCallback((ip: string) => {
    router.push(`/toto/${encodeURIComponent(ip)}`);
  }, [router]);

  // Render
  return <>
    <Toolbar
      component="header"
      sx={{
        flexShrink: 0,
        zIndex: 'appBar',
        pointerEvents: 'none',

        '& > *': {
          pointerEvents: 'auto',
        }
      }}
    >
      <Paper sx={{ p: 0.5, borderRadius: 9999 }}>
        <IpSearchBar ip={ip} onSearch={handleSearch} />
      </Paper>

      <Paper sx={{ ml: 'auto', p: 0.5, borderRadius: 9999 }}>
        <ColorModeToggle />
      </Paper>
    </Toolbar>

    { children }
  </>;
}