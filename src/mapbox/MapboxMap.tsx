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
  readonly children?: ReactNode;
  readonly sx?: SxProps;
}

export default function MapboxMap({ children, sx }: MapboxMapProps) {
  const [map, setMap] = useState<mapboxgl.Map>();
  const [styleLoaded, setStyleLoaded] = useState(false);
  const theme = useTheme();

  const container = useRef<HTMLDivElement>(null);
  const _loaded$ = useRef(var$(false));

  const context = useMemo(() => ({ map, loaded$: _loaded$.current }), [map]);

  useEffect(() => {
    if (!container.current) return;
    const loaded$ = _loaded$.current;

    // Initiate a new map
    const map = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_PK!,
      container: container.current,
      center: [-74.5, 40],
      zoom: 1,
    });

    setMap(map);
    loaded$.mutate(false);
    setStyleLoaded(false);

    // Manager loaded state
    const loadListener = () => {
      startTransition(() => {
        loaded$.mutate(true);
      });
    };
    const styleLoadListener = () => {
      setStyleLoaded(true);
    };

    map.once('load', loadListener);
    map.once('style.load', styleLoadListener);

    // Cleanup
    return () => {
      loaded$.mutate(false);
      setStyleLoaded(false);

      map.off('load', loadListener);
      map.off('style.load', styleLoadListener);
      map.remove();
    }
  }, []);

  useEffect(() => {
    if (!map || !styleLoaded) return;

    map.setConfigProperty('basemap', 'font', ['Roboto']);
    map.setConfigProperty('basemap', 'lightPreset', theme.map.light);
  }, [map, styleLoaded, theme.map.light]);

  return (
    <MapboxContext.Provider value={context}>
      <Box ref={container} sx={sx} />

      { children }
    </MapboxContext.Provider>
  )
}
