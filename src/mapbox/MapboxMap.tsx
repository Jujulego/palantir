'use client';

import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import { var$ } from 'kyrielle';
import mapboxgl from 'mapbox-gl';
import { ReactNode, Suspense, useEffect, useRef } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

import { MapboxContext } from '@/src/mapbox/Mapbox.context';

// Component
export interface MapboxMapProps {
  readonly children?: ReactNode;
  readonly sx?: SxProps;
}

export default function MapboxMap({ children, sx }: MapboxMapProps) {
  const map$ = useRef(var$<mapboxgl.Map>());
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const map = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_PK!,
      container: container.current,
      center: [-74.5, 40],
      zoom: 1,
    });

    map.on('load', () => {
      map$.current.mutate(map);
    });

    return () => map.remove()
  }, []);

  return (
    <MapboxContext.Provider value={map$.current}>
      <Box ref={container} sx={sx} />

      <Suspense>
        { children }
      </Suspense>
    </MapboxContext.Provider>
  )
}
