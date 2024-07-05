'use client';

import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import { var$ } from 'kyrielle';
import mapboxgl from 'mapbox-gl';
import { ReactNode, startTransition, useEffect, useMemo, useRef, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

import { MapboxContext } from '@/src/mapbox/Mapbox.context';

// Component
export interface MapboxMapProps {
  readonly children?: ReactNode;
  readonly sx?: SxProps;
}

export default function MapboxMap({ children, sx }: MapboxMapProps) {
  const [map, setMap] = useState<mapboxgl.Map>();

  const container = useRef<HTMLDivElement>(null);
  const loaded$ = useRef(var$(false));

  const context = useMemo(() => ({ map, loaded$: loaded$.current }), [map]);

  useEffect(() => {
    if (!container.current) return;

    // Initiate a new map
    const map = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_PK!,
      container: container.current,
      center: [-74.5, 40],
      zoom: 1,
    });

    setMap(map);
    loaded$.current.mutate(false);

    // Manager loaded state
    const listener = () => {
      startTransition(() => {
        loaded$.current.mutate(true);
      });
    };

    map.once('load', listener);

    // Cleanup
    return () => {
      map.off('load', listener);
      map.remove();
    }
  }, []);

  return (
    <MapboxContext.Provider value={context}>
      <Box ref={container} sx={sx} />

      { children }
    </MapboxContext.Provider>
  )
}
