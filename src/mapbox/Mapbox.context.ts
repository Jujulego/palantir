import { useStore$, UseStoreOptions } from '@/src/utils/store';
import { var$ } from 'kyrielle';
import mapboxgl from 'mapbox-gl';
import { createContext, useContext } from 'react';

// Context
export const MapboxContext = createContext(var$<mapboxgl.Map>());

// Hook
export function useMapboxMap(): mapboxgl.Map;
export function useMapboxMap(options: { suspense?: true }): mapboxgl.Map;
export function useMapboxMap(options: { suspense: false }): mapboxgl.Map | undefined;

export function useMapboxMap(options: UseStoreOptions = {}): mapboxgl.Map | undefined {
  const map$ = useContext(MapboxContext);

  return useStore$(map$, options);
}
