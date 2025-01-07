'use client';

import { MapboxContext } from '@/components/mapbox/MapboxMap';
import { type ReactNode, use, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Component
export interface MapboxDrawerProps {
  readonly children: ReactNode;
}

export function MapboxDrawer({ children }: MapboxDrawerProps) {
  const { drawerRef, openDrawer, closeDrawer } = use(MapboxContext);

  useEffect(() => {
    openDrawer();
    return closeDrawer;
  }, [closeDrawer, openDrawer]);

  return drawerRef && createPortal(children, drawerRef);
}