import { useMapEvent } from '@/hooks/useMapEvent';
import type * as mapboxgl from 'mapbox-gl';
import { type MotionValue, useTransform } from 'motion/react';
import { useCallback, useEffect } from 'react';

// Constants
const MapCameraIgnore = Symbol('MapCamera:ignore');

// Types
interface MapEvent extends mapboxgl.Event {
  [MapCameraIgnore]?: true,
}

// Component
export interface MapCameraProps {
  readonly map: mapboxgl.Map;
  readonly lat: MotionValue<number>;
  readonly lng: MotionValue<number>;
  readonly zoom: MotionValue<number>;
  readonly leftPadding: MotionValue<number>;
}

export default function MapCamera({ map, lat, lng, zoom, leftPadding }: MapCameraProps) {
  // Apply motion values to map camera
  const camera = useTransform([lat, lng, zoom, leftPadding], ([lat, lng, zoom, leftPadding]) => ({
    center: {
      lat: lat,
      lng: lng,
    },
    padding: {
      top: 72,
      left: leftPadding,
    },
    zoom: zoom
  } as mapboxgl.CameraOptions));
  
  useEffect(() => camera.on('change', (opts) => map.jumpTo(opts, { [MapCameraIgnore]: true })), [camera, map]);

  // Reflect moves to motion values
  const handleMove = useCallback((event: MapEvent) => {
    if (event[MapCameraIgnore]) return;

    const center = map.getCenter();
    lat.set(center.lat, false);
    lng.set(center.lng, false);
  }, [lat, lng, map]);

  useMapEvent(map, 'moveend', handleMove);

  // Reflect zoom to motion values
  const handleZoom = useCallback((event: MapEvent) => {
    if (event[MapCameraIgnore]) return;

    zoom.set(map.getZoom(), false);
  }, [map, zoom]);

  useMapEvent(map, 'zoomend', handleZoom);
  useMapEvent(map, 'boxzoomend', handleZoom);

  // Render
  return null;
}