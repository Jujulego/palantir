'use client';

import { useAppSelector } from '@/state/hooks';
import { type Map as Mapbox, Marker } from 'mapbox-gl';
import { memo, useEffect } from 'react';

// Component
export interface MapboxStoredMarkersProps {
  readonly map: Mapbox;
}

const MapboxStoredMarkers = memo(function MapboxStoredMarkers({ map }: MapboxStoredMarkersProps) {
  const ids = useAppSelector((state) => state.markers.allIds);

  return (
    <>
      { ids.map((id) => <MapboxStoredMarker key={id} map={map} id={id} />) }
    </>
  );
});

export default MapboxStoredMarkers;

// Utils
interface MapboxStoredMarkerProps {
  readonly map: Mapbox;
  readonly id: string;
}

const MapboxStoredMarker = memo(function MapboxStoredMarker({ map, id }: MapboxStoredMarkerProps) {
  const state = useAppSelector((state) => state.markers.byId[id]);

  useEffect(() => {
    if (!state) return;

    const marker = new Marker({ color: state.color });
    marker.setLngLat(state.lngLat);
    marker.addTo(map);

    return () => {
      marker.remove();
    };
  }, [map, state]);

  return null;
});
