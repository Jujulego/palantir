'use client';

import ColorModeToggle from '@/components/common/ColorModeToggle';
import SearchBox from '@/components/common/SearchBox';
import MapboxMap from '@/components/mapbox/MapboxMap';
import { Toolbar } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import { type ReactNode, useCallback, useMemo } from 'react';

// Layout
export interface WithMapLayoutProps {
  readonly children: ReactNode;
}

export default function WithMapLayout({ children }: WithMapLayoutProps) {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  
  const value = useMemo(() => segments[1] && decodeURIComponent(segments[1]), [segments])

  const handleSearch = useCallback((value: string) => {
    router.push(`ip/${value}`);
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
      <SearchBox value={value} onSearch={handleSearch} />

      <Paper sx={{ ml: 'auto', p: 0.5, borderRadius: 9999 }}>
        <ColorModeToggle />
      </Paper>
    </Toolbar>

    <MapboxMap>
      { children }
    </MapboxMap>
  </>;
}