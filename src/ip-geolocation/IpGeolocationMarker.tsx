'use client';

import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';

import { IpGeolocationResult } from '@/src/ip-geolocation/actions';
import { useMapboxMap } from '@/src/mapbox/Mapbox.context';

// Component
export interface IpGeolocationMarkerProps {
  readonly result: IpGeolocationResult;
}

export default function IpGeolocationMarker({ result }: IpGeolocationMarkerProps) {
  const map = useMapboxMap();

  useEffect(() => {
    const marker = new mapboxgl.Marker({ scale: 0.5 })
      .setLngLat([parseFloat(result.longitude), parseFloat(result.latitude)])
      .addTo(map);

    return () => void marker.remove();
  }, [map, result]);

  return null;
}
