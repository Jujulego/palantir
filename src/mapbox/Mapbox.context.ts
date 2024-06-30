import { useStore$ } from '@/src/utils/store';
import { var$ } from 'kyrielle';
import mapboxgl from 'mapbox-gl';
import { createContext, useContext } from 'react';

// Context
export const MapboxContext = createContext(var$<mapboxgl.Map>());

// Hook
export function useMapboxMap(): mapboxgl.Map {
  const map$ = useContext(MapboxContext);
  return useStore$(map$);
}
