'use client';

import { MapDrawerContext } from '@/components/map/drawer/map-drawer.context';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { type ReactNode, use, useEffect, useRef } from 'react';

// Component
export interface MapDrawerHeaderProps {
  readonly children: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function MapDrawerHeader({ children, sx }: MapDrawerHeaderProps) {
  // Track container height
  const { setHeaderHeight } = use(MapDrawerContext);
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
    
    return () => observer.disconnect();
  }, [setHeaderHeight]);

  // Render
  return (
    <Box ref={containerRef} sx={sx}>
      { children }
    </Box>
  );
}
