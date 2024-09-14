'use client';

import { useAppStore } from '@/state/hooks';
import type { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import { Map } from 'mapbox-gl';
import { useEffect, useRef } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

// Component
export interface MapboxMapProps {
  readonly sx?: SxProps<Theme>;
}

export default function MapboxMap({ sx }: MapboxMapProps) {
  const container = useRef<HTMLDivElement>(null);
  const store = useAppStore();

  useEffect(() => {
    const map = new Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_PK!,
      container: container.current!,
      center: [-74.5, 40],
      zoom: 1,
    });

    const id = setTimeout(() => {
      const state = store.getState();

      for (const marker of Object.values(state.markers.byId)) {
        marker.addTo(map);
      }
    }, 1000);

    // Cleanup
    return () => {
      map.remove();
      clearTimeout(id);
    };
  }, []);

  return <Box ref={container} sx={sx} />;
}