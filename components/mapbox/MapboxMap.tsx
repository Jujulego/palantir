'use client';

import { styled, useTheme } from '@mui/material/styles';
import mapboxgl from 'mapbox-gl';
import { createContext, type ReactNode, useEffect, useRef, useState } from 'react';

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

  // Render
  return (
    <MapboxContext.Provider value={{ map, isLoaded, isStyleLoaded }}>
      <Container ref={container} />
      { children }
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