'use client';

import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import { type CameraOptions, Event, type Map as MapboxGLMap } from 'mapbox-gl';
import { animate, motion, motionValue, type MotionValue, useMotionValue, useTransform } from 'motion/react';
import { createContext, type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

// Context
export interface MapboxMapState {
  readonly lat: MotionValue<number>;
  readonly lng: MotionValue<number>;
  readonly zoom: MotionValue<number>;
  readonly map: MapboxGLMap | null;
  readonly isLoaded: boolean;
  readonly isStyleLoaded: boolean;
  readonly drawerRef: HTMLDivElement | null;
  readonly openDrawer: () => void;
  readonly closeDrawer: () => void;
}

const initialState: MapboxMapState = {
  lat: motionValue(0),
  lng: motionValue(0),
  zoom: motionValue(0),
  map: null,
  isLoaded: false,
  isStyleLoaded: false,
  drawerRef: null,
  openDrawer: () => null,
  closeDrawer: () => null,
};

export const MapboxContext = createContext<MapboxMapState>(initialState);

// Component
export interface MapboxMapProps {
  readonly children?: ReactNode;
}

export default function MapboxMap({ children }: MapboxMapProps) {
  const container = useRef<HTMLDivElement>(null);

  // Drawer state
  const [drawerRef, setDrawerRef] = useState<HTMLDivElement | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Initiate map
  const [map, setMap] = useState<MapboxGLMap | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setIsStyleLoaded(false);

    // Load mapbox gl
    let map: MapboxGLMap;
    let cleaned = false;

    const loadListener = () => setIsLoaded(true);
    const styleLoadListener = () => setIsStyleLoaded(true);

    (async () => {
      const { Map: MapboxGLMap } = await import('mapbox-gl');
      if (cleaned) return;

      map = new MapboxGLMap({
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_PK!,
        container: container.current!,
        style: 'mapbox://styles/mapbox/standard?optimize=true',
        zoom: 1,
      });

      setMap(map);

      // load event
      map.once('load', loadListener);

      // style.load event
      map.once('style.load', styleLoadListener);
    })();

    // Cleanup
    return () => {
      cleaned = true;

      map?.off('load', loadListener);
      map?.off('style.load', styleLoadListener);
      map?.remove();

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

  // Map camera
  const lat = useMotionValue(0);
  const lng = useMotionValue(0);
  const zoom = useMotionValue(1);
  const leftPadding = useMotionValue(0);

  const camera = useTransform([lat, lng, zoom, leftPadding], ([lat, lng, zoom, leftPadding]: number[]): CameraOptions => ({
    center: {
      lat: lat,
      lng: lng,
    },
    padding: {
      top: 72,
      left: leftPadding,
    },
    zoom: zoom
  }));

  useEffect(() => {
    animate(leftPadding, isDrawerOpen ? 408 : 0);
  }, [isDrawerOpen, leftPadding]);

  useEffect(() => {
    if (!map) return;

    return camera.on('change', (opts) => {
      map.jumpTo(opts, { ignore: true });
    });
  }, [camera, map]);

  useEffect(() => {
    if (!map) return;

    const updateValues = (event: Event & { ignore?: number }) => {
      if (!event.ignore) {
        lat.set(map.getCenter().lat, false);
        lng.set(map.getCenter().lng, false);
        zoom.set(map.getZoom(), false);
      }
    };

    map.on('moveend', updateValues);
    map.on('zoomend', updateValues);

    return () => {
      map.off('moveend', updateValues);
      map.off('zoomend', updateValues);
    };
  }, [lat, lng, map, zoom]);

  // Render
  return (
    <MapboxContext.Provider
      value={{
        map, isLoaded, isStyleLoaded,
        lat, lng, zoom,
        drawerRef,
        openDrawer: useCallback(() => setIsDrawerOpen(true), []),
        closeDrawer: useCallback(() => setIsDrawerOpen(false), []),
      }}
    >
      <Container ref={container} />

      <MotionStack
        ref={setDrawerRef}
        style={{
          x: useTransform(leftPadding, (v) => v - 408),
        }}
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
      />

      { children }
    </MapboxContext.Provider>
  );
}

// Utils
const MotionStack = motion.create(Stack);
const Container = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
});
