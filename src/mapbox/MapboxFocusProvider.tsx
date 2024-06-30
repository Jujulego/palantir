'use client';

import { ReactNode, useMemo, useState } from 'react';

import { MapboxFocus } from '@/src/mapbox/MapboxFocus.context';

// Component
export interface MapboxFocusProviderProps {
  readonly initialFocusKey: string;
  readonly children: ReactNode;
}

export default function MapboxFocusProvider({ children, initialFocusKey }: MapboxFocusProviderProps) {
  const [focus, setFocus] = useState(initialFocusKey);
  const context = useMemo(() => ({ focus, setFocus }), [focus, setFocus]);

  return (
    <MapboxFocus.Provider value={context}>
      { children }
    </MapboxFocus.Provider>
  );
}
