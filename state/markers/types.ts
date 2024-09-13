import type { Marker } from 'mapbox-gl';

export interface MarkersState {
  byId: Record<string, Marker>;
}