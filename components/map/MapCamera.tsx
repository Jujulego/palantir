import type { MapCamera } from '@/components/map/map.context';
import type * as mapboxgl from 'mapbox-gl';
import { useTransform } from 'motion/react';
import { useEffect } from 'react';

// Component
export interface MapCameraProps {
  readonly camera: MapCamera;
  readonly map: mapboxgl.Map;
}

export default function MapCamera({ camera, map }: MapCameraProps) {
  // Apply motion values to map camera
  const options = useTransform(
    [camera.lat, camera.lng, camera.padding.top, camera.padding.left, camera.padding.bottom, camera.padding.right, camera.zoom],
    ([lat, lng, top, left, bottom, right, zoom]) => ({
      center: { lat, lng },
      padding: { top, left, bottom, right },
      zoom: zoom
    } as mapboxgl.CameraOptions)
  );
  
  useEffect(() => options.on('change', (opts) => map.jumpTo(opts)), [options, map]);

  // Render
  return null;
}
