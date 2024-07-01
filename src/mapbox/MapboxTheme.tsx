'use client';

import { useMapboxMap } from '@/src/mapbox/Mapbox.context';
import { useColorScheme } from '@mui/material';
import { useEffect } from 'react';

export default function MapboxTheme() {
  const map = useMapboxMap();
  const { mode } = useColorScheme();

  useEffect(() => {
    map.setConfigProperty('basemap', 'font', ['Roboto']);
  }, [map]);

  useEffect(() => {
    map.setConfigProperty('basemap', 'lightPreset', mode === 'dark' ? 'night' : 'day');
  }, [map, mode]);

  return null;
}
