import type * as mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';

export function useLazyMapbox() {
  const [isLoaded, setIsLoaded] = useState(false);
  const mapboxRef = useRef<typeof mapboxgl>(null);

  useEffect(() => {
    let cleaned = false;

    import('mapbox-gl').then((mapbox) => {
      if (!cleaned) {
        mapboxRef.current = mapbox;
        setIsLoaded(true);
      }
    });

    return () => {
      cleaned = true;
    };
  }, []);

  return { isLoaded, mapboxRef };
}
