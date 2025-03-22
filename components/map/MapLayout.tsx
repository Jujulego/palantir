'use client';

import { MapContext } from '@/components/map/map.context';
import MapboxMap from '@/components/map/MapboxMap';
import MapCamera from '@/components/map/MapCamera';
import MapDrawerContainer from '@/components/map/MapDrawerContainer';
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
  const zoom = useMotionValue(INITIAL_ZOOM);
  const leftPadding = useMotionValue(0);

  // Render
  const value = useMemo(() => ({
    map,
    isLoaded,
    isStyleLoaded,
    camera: { lat, lng, zoom },
  }), [isLoaded, isStyleLoaded, lat, lng, map, zoom]);

  return (
    <MapContext value={value}>
      <MapDrawerContainer leftPadding={leftPadding}>
        { children }
      </MapDrawerContainer>

      <MapboxMap
        leftPadding={leftPadding}
        zoom={INITIAL_ZOOM}
        onMapCreated={setMap}
        onMapLoaded={handleMapLoaded}
        onMapStyleLoaded={handleMapStyleLoaded}
        onMapRemoved={handleMapRemoved}
      />

      { map && <MapCamera map={map} lat={lat} lng={lng} zoom={zoom} leftPadding={leftPadding} /> }
      { map && isStyleLoaded && <MapStyle map={map} /> }
    </MapContext>
  );
}
