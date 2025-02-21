import type { MapMarkerProps } from '@/components/map/MapMarker';
import { createContext } from 'react';

// Context
export const ServerMarkersContext = createContext<ServerMarkersContextProps>({
  selectedMarker: 'vercel',
  createMarker: () => null,
  selectMarker: () => null,
});

// Types
export interface ServerMarkersContextProps {
  readonly createMarker: (key: string, props: MapMarkerProps) => void;
  readonly selectMarker: (key: string) => void;
  readonly selectedMarker?: string;
}