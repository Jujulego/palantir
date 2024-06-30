'use client';

import { useMapboxMap } from '@/src/mapbox/Mapbox.context';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// Components
export interface MapboxMarkerProps {
  readonly color?: string;
  readonly lngLat: LngLatLike;
}

export default function MapboxMarker({ color, lngLat }: MapboxMarkerProps) {
  const map = useMapboxMap();
  const [marker, setMarker] = useState<mapboxgl.Marker>(new mapboxgl.Marker());

  useLayoutEffect(() => {
    setMarker(new mapboxgl.Marker({ color }));
  }, [color]);

  useEffect(() => {
    marker.setLngLat(lngLat);
  }, [marker, lngLat]);

  useEffect(() => {
    const m = marker.addTo(map);
    return () => void m.remove();
  }, [marker, map]);

  return null;
}
