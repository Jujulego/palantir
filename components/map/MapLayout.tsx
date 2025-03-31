'use client';

import { MapContext } from '@/components/map/map.context';
import MapboxMap from '@/components/map/MapboxMap';
import MapCamera from '@/components/map/MapCamera';
import MapStyle from '@/components/map/MapStyle';
import type * as mapboxgl from 'mapbox-gl';
import { useMotionValue } from 'motion/react';
import { type ReactNode, useCallback, useMemo, useState } from 'react';

// Constants
const INITIAL_ZOOM = 1;

// Component
export interface MapLayoutProps {
  readonly children: ReactNode;
}

export default function MapLayout({ children }: MapLayoutProps) {
  // Map state
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);

  const handleMapLoaded = useCallback(() => setIsLoaded(true), []);
  const handleMapStyleLoaded = useCallback(() => setIsStyleLoaded(true), []);
  const handleMapRemoved = useCallback(() => {
    setMap(null);
    setIsLoaded(false);
    setIsStyleLoaded(false);
  }, []);

  // Camera values
  const lat = useMotionValue(0);
  const lng = useMotionValue(0);
  const height = useMotionValue(0);
  const width = useMotionValue(0);
  const zoom = useMotionValue(INITIAL_ZOOM);

  const topPadding = useMotionValue(0);
  const leftPadding = useMotionValue(0);
  const bottomPadding = useMotionValue(0);
  const rightPadding = useMotionValue(0);

  const camera = useMemo(() => ({
    lat,
    lng,
    height,
    width,
    zoom,
    padding: {
      top: topPadding,
      left: leftPadding,
      bottom: bottomPadding,
      right: rightPadding,
    },
  }), [bottomPadding, height, lat, leftPadding, lng, rightPadding, topPadding, width, zoom]);

  // Render
  return (
    <MapContext
      value={{
        camera,
        map,
        isLoaded,
        isStyleLoaded,
      }}
    >
      <MapboxMap
        camera={camera}
        onMapCreated={setMap}
        onMapLoaded={handleMapLoaded}
        onMapStyleLoaded={handleMapStyleLoaded}
        onMapRemoved={handleMapRemoved}
      />

      { map && <MapCamera camera={camera} map={map} /> }
      { map && isStyleLoaded && <MapStyle map={map} /> }

      { children }
    </MapContext>
  );
}
