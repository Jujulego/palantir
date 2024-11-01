'use client';

import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import mapboxgl from 'mapbox-gl';
import { useSelectedLayoutSegments } from 'next/navigation';
import { createContext, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

// Context
export interface MapboxMapState {
  readonly map: mapboxgl.Map | null;
  readonly isLoaded: boolean;
  readonly isStyleLoaded: boolean;
}

const initialState: MapboxMapState = {
  map: null,
  isLoaded: false,
  isStyleLoaded: false,
};

export const MapboxContext = createContext<MapboxMapState>(initialState);

// Component
export interface MapboxMapProps {
  readonly children?: ReactNode;
}

export default function MapboxMap({ children }: MapboxMapProps) {
  const container = useRef<HTMLDivElement>(null);

  // Compute padding
  const segments = useSelectedLayoutSegments();
  const value = useMemo(() => segments[1] && decodeURIComponent(segments[1]), [segments])

  const padding = useMemo(() => {
    if (value) {
      return { top: 72, left: 408 };
    } else {
      return { top: 72, left: 0 };
    }
  }, [value]);

  // Initiate map
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);

  useEffect(() => {
    const map = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_PK!,
      container: container.current!,
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
      setIsLoaded(false);
      setIsStyleLoaded(false);
    };
  }, []);

  // Setup map style
  const theme = useTheme();

  useEffect(() => {
    if (!map) return;
    if (!isStyleLoaded) return;

    map.setConfigProperty('basemap', 'font', theme.typography.fontFamily);
    map.setConfigProperty('basemap', 'lightPreset', theme.map.light);
  }, [map, isStyleLoaded, theme.map.light, theme.typography.fontFamily]);

  useEffect(() => {
    if (!map) return;

    map.setPadding(padding ?? {});
  }, [map, padding]);

  // Render
  return (
    <MapboxContext.Provider value={{ map, isLoaded, isStyleLoaded }}>
      <Container ref={container} />

      <Slide in={!!value} direction="right">
        <Stack
          sx={{
            position: 'absolute',
            top: 0, left: 0,
            width: 408, height: '100vh',
            overflow: 'auto',
            bgcolor: 'grey.50',
            borderRight: '1px solid',
            borderRightColor: 'divider',
            ...theme.applyStyles('dark', {
              bgcolor: 'background.paper'
            })
          }}
        >
          { children }
        </Stack>
      </Slide>
    </MapboxContext.Provider>
  );
}

// Utils
const Container = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
});
