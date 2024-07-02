'use client';

import { useMediaQuery, useTheme } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';

import { useMapboxMap } from '@/src/mapbox/Mapbox.context';

export default function MapboxNavigationControl() {
  const map = useMapboxMap();

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!smallScreen) {
      const control = new mapboxgl.NavigationControl();
      map.addControl(control, 'bottom-right');

      return () => void map.removeControl(control);
    }
  }, [smallScreen, map]);

  return null;
}
