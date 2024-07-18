'use client';

import Box from '@mui/material/Box';
import { type SxProps, useTheme } from '@mui/material/styles';
import { var$ } from 'kyrielle';
import mapboxgl from 'mapbox-gl';
import { ReactNode, startTransition, useEffect, useMemo, useRef, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

import { MapboxContext } from '@/src/mapbox/Mapbox.context';

// Component
export interface MapboxMapProps {
  readonly initialFocusKey: string;
  readonly children?: ReactNode;
  readonly sx?: SxProps;
}

export default function MapboxMap({ initialFocusKey, children, sx }: MapboxMapProps) {
  // Create map
  const [map, setMap] = useState<mapboxgl.Map>();
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initiate a new map
    const map = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_PK!,
      container: container.current!,
      center: [-74.5, 40],
      zoom: 1,
    });

    setMap(map);

    // Cleanup
    return () => void map.remove();
  }, []);

  // Manage loaded state
  const _loaded$ = useRef(var$(false));

  useEffect(() => {
    if (!map) return;

    const loaded$ = _loaded$.current;
    loaded$.mutate(false);

    // Manager loaded state
    const loadListener = () => {
      startTransition(() => {
        loaded$.mutate(true);
      });
    };

    map.once('load', loadListener);

    // Cleanup
    return () => {
      loaded$.mutate(false);
      map.off('load', loadListener);
    }
  }, [map]);

  // Handle style
  const [styleLoaded, setStyleLoaded] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (!map) return;

    // Listen for "style.load"
    const styleLoadListener = () => {
      setStyleLoaded(true);
    };

    setStyleLoaded(false);
    map.once('style.load', styleLoadListener);

    // Cleanup
    return () => {
      setStyleLoaded(false);
      map.off('style.load', styleLoadListener);
    }
  }, [map]);

  useEffect(() => {
    if (!map || !styleLoaded) return;

    map.setConfigProperty('basemap', 'font', ['Roboto']);
    map.setConfigProperty('basemap', 'lightPreset', theme.map.light);
  }, [map, styleLoaded, theme.map.light]);

  // Handle spin
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    if (!map || !spin) return;

    // Make map spin
    function spinAnimation() {
      const center = map!.getCenter();
      center.lng += 360 / 240; // <= 1 revolution every 4 minutes

      map!.easeTo({
        center,
        zoom: Math.min(3, map!.getZoom()),
        duration: 1000,
        easing: (n) => n
      });
    }

    map.on('moveend', spinAnimation); // <= start again move when it ends
    spinAnimation();

    map.once('mousedown', () => {
      setSpin(false);
    });

    return () => void map.off('moveend', spinAnimation);
  }, [map, spin]);

  // Render
  const [focus, setFocus] = useState(initialFocusKey);

  const context = useMemo(() => ({
    loaded$: _loaded$.current,
    map,
    focus, setFocus,
    spin, setSpin
  }), [map, focus, spin]);

  return (
    <MapboxContext.Provider value={context}>
      <Box ref={container} sx={sx} />

      { children }
    </MapboxContext.Provider>
  )
}
