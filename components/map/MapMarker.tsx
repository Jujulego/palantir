'use client';

import { MapContext } from '@/components/map/map.context';
import { useLazyMapbox } from '@/lib/map/useLazyMapbox';
import type { Marker } from 'mapbox-gl';
import { type ReactNode, use, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Component
export interface MapMarkerProps {
  readonly latitude: number;
  readonly longitude: number;
  readonly children?: ReactNode;
}

export default function MapMarker({ latitude, longitude, children }: MapMarkerProps) {
  const { mapboxRef, isLoaded: isMapboxLoaded } = useLazyMapbox();
  const { map, isLoaded } = use(MapContext);

  const elementRef = useRef(document.createElement('div'));
  const markerRef = useRef<Marker>(null);

  useEffect(() => {
    if (!mapboxRef.current) return;

    const { Marker } = mapboxRef.current;
    const marker = new Marker({
      anchor: 'bottom',
      element: elementRef.current,
      occludedOpacity: 0.75
    }).setLngLat({ lat: latitude, lng: longitude });

    markerRef.current = marker;

    if (map && isLoaded) {
      marker.addTo(map);

      return () => {
        marker.remove();
      };
    }
  }, [isMapboxLoaded, isLoaded, latitude, longitude, map, mapboxRef]);

  useEffect(() => {
    const marker = markerRef.current;
    if (!map || !isLoaded || !marker) return;

    marker.addTo(map);

    return () => {
      marker.remove();
    };
  }, [isLoaded, map]);

  useEffect(() => {
    if (!markerRef.current) return;
    
    markerRef.current.setLngLat({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);

  // Render
  return createPortal(children, elementRef.current);
}
