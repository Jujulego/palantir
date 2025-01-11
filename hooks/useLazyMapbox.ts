import type * as mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';

export type LazyMapboxCallback = (mapbox: typeof mapboxgl) => void | LazyMapboxCleanup;
export type LazyMapboxCleanup = () => void;

export function useLazyMapbox(cb: LazyMapboxCallback) {
  useEffect(() => {
    let cleaned = false;
    let cleanup: LazyMapboxCleanup | void;

    (async () => {
      if (cleaned) return;
      cleanup = cb(await import('mapbox-gl'));
    })();

    return () => {
      cleaned = true;
      if (cleanup) cleanup();
    };
  }, [cb]);
}