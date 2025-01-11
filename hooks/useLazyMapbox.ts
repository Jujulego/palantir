import type * as mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';

export type LazyMapboxCallback = (mapbox: typeof mapboxgl) => void | LazyMapboxCleanup;
export type LazyMapboxCleanup = () => void;

export function useLazyMapbox(cb: LazyMapboxCallback) {
  useEffect(() => {
    let cleaned = false;
    let cleanup: LazyMapboxCleanup | void;

    (async () => {
      const mapbox = await import('mapbox-gl');

      if (!cleaned) {
        cleanup = cb(mapbox);
      }
    })();

    return () => {
      cleaned = true;
      if (cleanup) cleanup();
    };
  }, [cb]);
}