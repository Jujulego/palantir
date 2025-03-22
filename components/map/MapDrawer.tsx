'use client';

import { MapDrawerContext } from '@/components/map/map-drawer.context';
import Stack from '@mui/material/Stack';
import { type ReactNode, use, useEffect } from 'react';

// Component
export interface MapDrawerProps {
  readonly children: ReactNode;
}

export default function MapDrawer({ children }: MapDrawerProps) {
  const { openDrawer, closeDrawer } = use(MapDrawerContext);

  // Open drawer !
  useEffect(() => {
    openDrawer();
    return closeDrawer;
  }, [openDrawer, closeDrawer]);

  // Render
  return (
    <Stack sx={{ height: '100%', overflow: 'auto' }}>
      { children }
    </Stack>
  );
}
