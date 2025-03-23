'use client';

import { MapDrawerContext } from '@/components/map/drawer/map-drawer.context';
import { mergeSx } from '@/lib/utils/mui';
import Box from '@mui/material/Box';
import { type SxProps, Theme } from '@mui/material/styles';
import { type ReactNode, use, useEffect, useRef } from 'react';

// Component
export interface MapDrawerProps {
  readonly children: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function MapDrawer({ children, sx }: MapDrawerProps) {
  const { openDrawer, closeDrawer, setDrawerHeight } = use(MapDrawerContext);

  // Open drawer !
  useEffect(() => {
    openDrawer();
    return closeDrawer;
  }, [openDrawer, closeDrawer]);

  // Track container height
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initial size
    const container = containerRef.current;
    setDrawerHeight(container.clientHeight);

    // Track resizes
    const observer = new ResizeObserver(() => {
      setDrawerHeight(container.clientHeight);
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
      setDrawerHeight(0);
    };
  }, [setDrawerHeight]);

  // Render
  return (
    <Box ref={containerRef} sx={mergeSx({ display: 'flex', flexDirection: 'column', height: '100%' }, sx)}>
      { children }
    </Box>
  );
}
