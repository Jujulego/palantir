'use client';

import { MapContext } from '@/components/map/map.context';
import Stack from '@mui/material/Stack';
import { type ReactNode, use, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Component
export interface MapDrawerProps {
  readonly children: ReactNode;
}

export default function MapDrawer({ children }: MapDrawerProps) {
  const { drawer } = use(MapContext);

  // Open drawer !
  useEffect(() => {
    drawer.openDrawer();
    return drawer.closeDrawer;
  }, [drawer.openDrawer, drawer.closeDrawer]);

  // Render
  if (!drawer.containerRef) {
    return null;
  }

  return createPortal(
    <Stack sx={{ height: '100%', overflow: 'auto' }}>
      { children }
    </Stack>,
    drawer.containerRef
  );
}