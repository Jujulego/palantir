'use client';

import { useTheme } from '@mui/material/styles';
import { use, useEffect } from 'react';

import { MapboxContext } from '@/src/mapbox/Mapbox.context';

export default function MapboxTheme() {
  const { map } = use(MapboxContext);
  const theme = useTheme();

  useEffect(() => {
    map?.setConfigProperty('basemap', 'font', ['Roboto']);
  }, [map]);

  useEffect(() => {
    map?.setConfigProperty('basemap', 'lightPreset', theme.map.light);
  }, [map, theme.map.light]);

  return null;
}
