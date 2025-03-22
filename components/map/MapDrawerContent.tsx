'use client';

import { MapDrawerContext } from '@/components/map/map-drawer.context';
import { type ReactNode, use, useEffect } from 'react';

// Component
export interface MapDrawerProps {
  readonly children: ReactNode;
}

export default function MapDrawerContent({ children }: MapDrawerProps) {
  const { openDrawer, closeDrawer } = use(MapDrawerContext);

  // Open drawer !
  useEffect(() => {
    openDrawer();
    return closeDrawer;
  }, [openDrawer, closeDrawer]);

  // Render
  return children;
}
