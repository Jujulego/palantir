'use client';

import { useAppStore } from '@/state/hooks';
import { combineLatest$ } from '@/utils/combineLatest$';
import { selector$ } from '@/utils/selector$';
import type { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { type SxProps, useTheme } from '@mui/material/styles';
import { map$, pipe$, switchMap$ } from 'kyrielle';
import { Map as Mapbox, Marker } from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

// Component
export interface MapboxMapProps {
  readonly sx?: SxProps<Theme>;
}

export default function MapboxMap({ sx }: MapboxMapProps) {
  const store = useAppStore();
  const theme = useTheme();

  const container = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<Mapbox | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);

  useEffect(() => {
    const map = new Mapbox({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_PK!,
      container: container.current!,
      center: [-74.5, 40],
      zoom: 1,
    });

    setMap(map);

    // load event
    const loadListener = () => setIsLoaded(true);
    map.once('load', loadListener);

    // style.load event
    const styleLoadListener = () => setIsStyleLoaded(true);
    map.once('style.load', styleLoadListener);

    // Cleanup
    return () => {
      map.off('load', loadListener);
      map.off('style.load', styleLoadListener);
      map.remove();

      setMap(null);
    };
  }, [store]);

  useEffect(() => {
    if (!map || !isStyleLoaded) return;

    map.setConfigProperty('basemap', 'font', theme.typography.fontFamily);
    map.setConfigProperty('basemap', 'lightPreset', theme.map.light);
  }, [map, isStyleLoaded, theme]);

  useEffect(() => {
    if (!map || !isLoaded) return;

    // Add markers from store
    const markers = new Map<string, Marker>();

    const subscribe = pipe$(
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
    ).subscribe();

    return subscribe.unsubscribe;
  }, [map, store, isLoaded]);

  // Render
  return <Box ref={container} sx={sx} />;
}
