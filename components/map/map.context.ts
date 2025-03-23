import type * as mapboxgl from 'mapbox-gl';
import { motionValue, type MotionValue } from 'motion/react';
import { createContext } from 'react';

// Types
export interface MapContextProps {
  readonly map: mapboxgl.Map | null;
  readonly isLoaded: boolean;
  readonly isStyleLoaded: boolean;

  readonly camera: MapCamera;
}

export interface MapCamera {
  readonly lat: MotionValue<number>;
  readonly lng: MotionValue<number>;
  readonly zoom: MotionValue<number>;
  readonly padding: {
    readonly top: MotionValue<number>;
    readonly left: MotionValue<number>;
    readonly bottom: MotionValue<number>;
    readonly right: MotionValue<number>;
  }
}

export const MapContext = createContext<MapContextProps>({
  map: null,
  isLoaded: true,
  isStyleLoaded: true,
  camera: {
    lat: motionValue(0),
    lng: motionValue(0),
    zoom: motionValue(0),
    padding: {
      top: motionValue(0),
      left: motionValue(0),
      bottom: motionValue(0),
      right: motionValue(0),
    }
  }
});
