'use client';

import { MapDrawerContext } from '@/components/map/drawer/map-drawer.context';
import { type ReactNode, use } from 'react';

// Component
export interface MapDrawerModeGateProps {
  readonly children: ReactNode;
}

export default function MapDrawerIllustration({ children }: MapDrawerModeGateProps) {
  const { mode } = use(MapDrawerContext);
  return mode !== 'desktop' ? null : children;
}
