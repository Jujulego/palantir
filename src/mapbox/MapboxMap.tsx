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

    // Manager loaded state
    const listener = () => {
      startTransition(() => {
        loaded$.mutate(true);
      });
    };

    map.once('load', listener);

    // Cleanup
    return () => {
      loaded$.mutate(false);

      map.off('load', listener);
      map.remove();
    }
  }, []);

  useEffect(() => {
    if (!map) return;

    const listener = () => {
      map.setConfigProperty('basemap', 'font', ['Roboto']);
      map.setConfigProperty('basemap', 'lightPreset', theme.map.light);
    };

    map.once('style.load', listener);

    return () => void map.off('style.load', listener);
  }, [map, theme.map.light]);

  return (
    <MapboxContext.Provider value={context}>
      <Box ref={container} sx={sx} />

      { children }
    </MapboxContext.Provider>
  )
}
