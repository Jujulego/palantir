'use client';

import { MapDrawerContext } from '@/components/map/drawer/map-drawer.context';
import { type ReactNode, use, useEffect } from 'react';

// Component
export interface MapDrawerProps {
  readonly children: ReactNode;
}

export default function MapDrawer({ children }: MapDrawerProps) {
  const { mode, setState } = use(MapDrawerContext);

  // Open drawer !
  useEffect(() => {
    if (mode === 'mobile') {
      setState((old) => old === 'closed' ? 'reduced' : old);
    } else {
      setState('opened');
    }

    return () => setState('closed');
  }, [mode, setState]);

  // Render
  return children;
}
