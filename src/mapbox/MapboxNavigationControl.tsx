'use client';

import { useMapboxMap } from '@/src/mapbox/Mapbox.context';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

export default function MapboxNavigationControl() {
  const map = useMapboxMap();
  const controls = useRef(new mapboxgl.NavigationControl());

  useEffect(() => {
    map.addControl(controls.current);

    return () => {
      map.removeControl(controls.current)
    };
  }, [map]);

  return null;
}
