'use client';

import ColorModeToggle from '@/components/common/ColorModeToggle';
import LocateButton from '@/components/common/LocateButton';
import SearchBox from '@/components/common/SearchBox';
import MapboxMap from '@/components/mapbox/MapboxMap';
import { Toolbar } from '@mui/material';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import { type ReactNode, useCallback, useMemo } from 'react';

// Layout
export interface WithMapLayoutProps {
  readonly children: ReactNode;
}

export default function WithMapLayout({ children }: WithMapLayoutProps) {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  const theme = useTheme();
  
  const value = useMemo(() => segments[1] && decodeURIComponent(segments[1]), [segments])

  const handleClear = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleSearch = useCallback((value: string) => {
    router.push(`/ip/${value}/ip-info`);
  }, [router]);

  const padding = useMemo(() => {
    if (value) {
      return { top: 72, left: 408 };
    } else {
      return { top: 72, left: 0 };
    }
  }, [value]);

  // Render
  return <>
    <Toolbar
      component="header"
      disableGutters
      sx={{
        flexShrink: 0,
        zIndex: 'appBar',
        p: 1.5,
        pointerEvents: 'none',

        '& > *': {
          pointerEvents: 'auto',
        }
      }}
    >
      <SearchBox value={value} onClear={handleClear} onSearch={handleSearch} />

      <Paper elevation={2} sx={{ ml: 3, p: 0.5, borderRadius: 9999 }}>
        <LocateButton />
      </Paper>

      <Paper elevation={2} sx={{ ml: 'auto', p: 0.5, borderRadius: 9999 }}>
        <ColorModeToggle />
      </Paper>
    </Toolbar>

    <MapboxMap padding={padding}>
      <Slide in={!!value} direction="right">
        <Stack
          sx={{
            position: 'absolute',
            top: 0, left: 0,
            width: 408, height: '100vh',
            overflow: 'auto',
            bgcolor: 'grey.50',
            borderRight: '1px solid',
            borderRightColor: 'divider',
            ...theme.applyStyles('dark', {
              bgcolor: 'background.paper'
            })
          }}
        >
          { children }
        </Stack>
      </Slide>
    </MapboxMap>
  </>;
}
