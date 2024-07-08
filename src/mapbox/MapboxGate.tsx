'use client';

import { type ReactNode, Suspense, use } from 'react';

import { MapboxContext } from '@/src/mapbox/Mapbox.context';
import { useStore$ } from '@/src/utils/store';

// Component
export interface MapboxGateProps {
  readonly children?: ReactNode;
}

export default function MapboxGate({ children }: MapboxGateProps) {
  const { map, loaded$ } = use(MapboxContext);
  const loaded = useStore$(loaded$, () => false);

  if (!map || !loaded) {
    return null;
  }

  return <Suspense>{ children }</Suspense>;
}
