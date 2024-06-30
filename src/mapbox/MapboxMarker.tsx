'use client';

import { useMapboxMap } from '@/src/mapbox/Mapbox.context';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { useEffect, useRef } from 'react';

// Components
export interface MapboxMarkerProps {
  readonly lngLat: LngLatLike;
}

export default function MapboxMarker({ lngLat }: MapboxMarkerProps) {
  const map = useMapboxMap();
  const marker = useRef(new mapboxgl.Marker());

  useEffect(() => {
    marker.current.setLngLat(lngLat);
  }, [lngLat]);

  useEffect(() => {
    const m = marker.current.addTo(map);
    return () => void m.remove();
  }, [map]);

  return null;
}
