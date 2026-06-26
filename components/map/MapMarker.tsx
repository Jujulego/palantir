'use client';

import { MapContext } from '@/components/map/map.context';
import { Marker } from 'mapbox-gl/esm';
import { type ReactNode, use, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Component
export interface MapMarkerProps {
  readonly latitude: number;
  readonly longitude: number;
  readonly children?: ReactNode;
}

export default function MapMarker({ latitude, longitude, children }: MapMarkerProps) {
  const { map, isLoaded } = use(MapContext);

  const elementRef = useRef<HTMLElement>(null);
  const markerRef = useRef<Marker>(null);

  function element() {
    if (!elementRef.current) {
      elementRef.current = document.createElement('div');
    }

    return elementRef.current;
  }

  useEffect(() => {
    const marker = new Marker({
      anchor: 'bottom',
      element: element(),
      occludedOpacity: 0.75
    }).setLngLat({ lat: latitude, lng: longitude });

    markerRef.current = marker;

    if (map && isLoaded) {
      marker.addTo(map);

      return () => {
        marker.remove();
      };
    }
  }, [isLoaded, latitude, longitude, map]);

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
  return createPortal(children, element()); // eslint-disable-line react-hooks/refs
}
