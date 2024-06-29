'use client';

import { Box } from '@mui/material';
import { var$ } from 'kyrielle';
import mapboxgl from 'mapbox-gl';
import { ReactNode, Suspense, useEffect, useRef } from 'react';

import { MapboxContext } from '@/src/mapbox/Mapbox.context';

// Setup
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PK!;

// Component
export interface MapboxMapProps {
  readonly children?: ReactNode;
}

export default function MapboxMap({ children }: MapboxMapProps) {
  const map$ = useRef(var$<mapboxgl.Map>());
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const map = new mapboxgl.Map({
      container: container.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 4,
    });

    map$.current.mutate(map);

    return () => map.remove();
  }, []);

  return (
    <MapboxContext.Provider value={map$.current}>
      <Box height="100%" width="100%" ref={container} />
      <Suspense>
        { children }
      </Suspense>
    </MapboxContext.Provider>
  )
}
