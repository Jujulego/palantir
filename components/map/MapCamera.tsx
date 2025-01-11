import type * as mapboxgl from 'mapbox-gl';
import { type MotionValue, useTransform } from 'motion/react';
import { useEffect } from 'react';

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
  
  useEffect(() => camera.on('change', (opts) => map.jumpTo(opts)), [camera, map]);

  // Render
  return null;
}
