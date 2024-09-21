import type { LngLatLike } from 'mapbox-gl';

export interface MarkerState {
  readonly color?: string;
  readonly lngLat: LngLatLike;
}

export interface MarkersState {
  readonly byId: Readonly<Record<string, MarkerState>>;
  readonly allIds: readonly string[];
}
