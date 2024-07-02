'use client';

import { useTheme } from '@mui/material';
import { useEffect } from 'react';

import { useMapboxMap } from '@/src/mapbox/Mapbox.context';

export default function MapboxTheme() {
  const map = useMapboxMap();
  const theme = useTheme();

  useEffect(() => {
    map.setConfigProperty('basemap', 'font', ['Roboto']);
  }, [map]);

  useEffect(() => {
    map.setConfigProperty('basemap', 'lightPreset', theme.map.light);
  }, [map, theme.map.light]);

  return null;
}
