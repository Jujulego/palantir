'use client';

import { MapDrawerContext } from '@/components/map/drawer/map-drawer.context';
import { mergeSx } from '@/lib/utils/mui';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import { type ReactNode, use, useEffect, useRef } from 'react';

// Component
export interface MapDrawerHeaderProps {
  readonly children: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function MapDrawerHeader({ children, sx }: MapDrawerHeaderProps) {
  // Track container height
  const { mode, setHeaderHeight } = use(MapDrawerContext);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Initial size
    const container = containerRef.current;
    setHeaderHeight(container.clientHeight);

    // Track resizes
    const observer = new ResizeObserver(() => {
      setHeaderHeight(container.clientHeight);
    });
    observer.observe(container);
    
    return () => {
      observer.disconnect();
      setHeaderHeight(0);
    };
  }, [setHeaderHeight]);

  // Render
  return (
    <Box ref={containerRef} sx={mergeSx({ position: 'relative' }, sx)}>
      { mode === 'mobile' && <Grab /> }
      { children }
    </Box>
  );
}

// Elements
const Grab = styled('div')(({ theme }) => [
  {
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 21px)',
    height: 8,
    width: 42,
    borderRadius: 4,
    backgroundColor: grey[300],
  },
  theme.applyStyles('dark', {
    backgroundColor: theme.vars.palette.background.paper,
  })
]);
