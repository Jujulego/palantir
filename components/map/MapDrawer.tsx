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
  const { drawer: { openDrawer, closeDrawer, containerRef } } = use(MapContext);

  // Open drawer !
  useEffect(() => {
    openDrawer();
    return () => closeDrawer();
  }, [openDrawer, closeDrawer]);

  // Render
  if (!containerRef) {
    return null;
  }

  return createPortal(
    <Stack sx={{ height: '100%', overflow: 'auto' }}>
      { children }
    </Stack>,
    containerRef
  );
}
