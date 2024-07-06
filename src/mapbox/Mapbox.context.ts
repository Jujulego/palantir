import { type Deferrable, type Observable, var$, waitFor$ } from 'kyrielle';
import type mapboxgl from 'mapbox-gl';
import { createContext, use } from 'react';

import { useStore$ } from '@/src/utils/store';

// Context
export interface MapboxContextProps {
  map?: mapboxgl.Map;
  loaded$: Observable<boolean> & Deferrable<boolean>;
}

export const MapboxContext = createContext<MapboxContextProps>({
  loaded$: var$(false),
});

// Hook
export function useMapboxMap(): mapboxgl.Map {
  const { map, loaded$ } = use(MapboxContext);
  const loaded = useStore$(loaded$, () => false);

  while (!map || !loaded) {
    use(waitFor$(loaded$));
  }

  return map;
}
