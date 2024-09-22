'use client';

import MapboxStoredMarkers from '@/components/mapbox/MapboxStoredMarkers';
import { useAppStore } from '@/state/hooks';
import type { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { type SxProps, useTheme } from '@mui/material/styles';
import { Map as Mapbox } from 'mapbox-gl';
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
    setIsLoaded(false);
    setIsStyleLoaded(false);

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

  // Render
  return (
    <Box ref={container} sx={sx}>
      { map && isLoaded && <MapboxStoredMarkers map={map} /> }
    </Box>
  );
}
