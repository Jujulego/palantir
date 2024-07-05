'use client';

import { MapboxContext } from '@/src/mapbox/Mapbox.context';
import { type ReactNode, Suspense, use, useCallback, useSyncExternalStore } from 'react';

// Component
export interface MapboxGateProps {
  readonly children?: ReactNode;
}

export function MapboxGate({ children }: MapboxGateProps) {
  const { map, loaded$ } = use(MapboxContext);
  const loaded = useSyncExternalStore(
    useCallback((cb) => {
      const sub = loaded$.subscribe(cb);
      return () => sub.unsubscribe();
    }, [loaded$]),
    () => loaded$.defer(),
    () => false,
  );

  if (!map || !loaded) {
    return null;
  }

  return <Suspense>{ children }</Suspense>;
}