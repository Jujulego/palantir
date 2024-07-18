import { type Deferrable, type Observable, var$, waitFor$ } from 'kyrielle';
import type mapboxgl from 'mapbox-gl';
import { createContext, type Dispatch, type SetStateAction, use } from 'react';

import { useStore$ } from '@/src/utils/store';

// Context
export interface MapboxContextProps {
  readonly loaded$: Observable<boolean> & Deferrable<boolean>;
  readonly map?: mapboxgl.Map;

  // Focus management
  readonly focus: string;
  readonly setFocus: Dispatch<SetStateAction<string>>;

  // Spin management
  readonly spin: boolean;
  readonly setSpin: Dispatch<SetStateAction<boolean>>;
}

export const MapboxContext = createContext<MapboxContextProps>({
  loaded$: var$(false),

  focus: '',
  setFocus: () => {},

  spin: false,
  setSpin: () => {}
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
