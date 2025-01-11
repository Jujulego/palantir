import type * as mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';

export type MapEventListener<in T extends mapboxgl.MapEventType> = (event: mapboxgl.MapEventOf<T>) => void;

/**
 * Setup a mapbox map event listener
 * @param map
 * @param event
 * @param listener
 */
export function useMapEvent<const T extends mapboxgl.MapEventType>(map: mapboxgl.Map | null, event: T, listener: MapEventListener<T>) {
  useEffect(() => {
    if (!map) return;

    map.on(event, listener);

    return () => {
      map.off(event, listener);
    };
  }, [map, listener, event]);
}