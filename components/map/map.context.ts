import type * as mapboxgl from 'mapbox-gl';
import { motionValue, type MotionValue } from 'motion/react';
import { createContext } from 'react';

// Types
export interface MapContextProps {
  readonly map: mapboxgl.Map | null;
  readonly isLoaded: boolean;
  readonly isStyleLoaded: boolean;

  readonly camera: MapCamera;
  readonly drawer: MapDrawer;
}

export interface MapCamera {
  readonly lat: MotionValue<number>;
  readonly lng: MotionValue<number>;
  readonly zoom: MotionValue<number>;
}

export interface MapDrawer {
  readonly containerRef: HTMLDivElement | null;
  readonly openDrawer: () => void;
  readonly closeDrawer: () => void;
}

export const MapContext = createContext<MapContextProps>({
  map: null,
  isLoaded: true,
  isStyleLoaded: true,
  camera: {
    lat: motionValue(0),
    lng: motionValue(0),
    zoom: motionValue(0),
  },
  drawer: {
    containerRef: null,
    openDrawer: () => null,
    closeDrawer: () => null,
  }
});