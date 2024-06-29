'use client';

import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';

import { useMapboxMap } from '@/src/mapbox/Mapbox.context';

export default function MapboxNavigationControl() {
  const map = useMapboxMap();

  useEffect(() => {
    const control = new mapboxgl.NavigationControl();
    map.addControl(control);

    return () => void map.removeControl(control);
  }, [map]);

  return null;
}
