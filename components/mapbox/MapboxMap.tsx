'use client';

import { useAppStore } from '@/state/hooks';
import { combineLatest$ } from '@/utils/combineLatest$';
import { selector$ } from '@/utils/selector$';
import type { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import { map$, off$, pipe$, switchMap$ } from 'kyrielle';
import { Map as Mapbox, Marker } from 'mapbox-gl';
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
    const map = new Mapbox({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_PK!,
      container: container.current!,
      center: [-74.5, 40],
      zoom: 1,
    });

    // Load event
    const off = off$();

    const loadListener = () => {
      // Manage markers
      const markers = new Map<string, Marker>();

      off.add(pipe$(
        selector$(store, (state) => state.markers.allIds),
        switchMap$((ids) => combineLatest$(ids.map((id) => pipe$(
          selector$(store, (state) => state.markers.byId[id]),
          map$(({ color, lngLat }) => {
            let marker = markers.get(id);

            if (!marker) {
              marker = new Marker({ color });
              marker.setLngLat(lngLat);
              marker.addTo(map);
            } else {
              marker.setLngLat(lngLat);
            }
          }),
        )))),
      ).subscribe());
    };

    map.once('load', loadListener);

    // Cleanup
    return () => {
      map.off('load', loadListener);
      off.unsubscribe();

      map.remove();
    };
  }, [store]);

  return <Box ref={container} sx={sx} />;
}
