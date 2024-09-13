'use client';

import { useAppDispatch } from '@/state/hooks';
import { addMarker, removeMarker } from '@/state/markers/actions';
import { type LngLatLike, Marker } from 'mapbox-gl';
import { useEffect, useId, useState } from 'react';

// Component
export interface MapMarkerProps {
  readonly color?: string;
  readonly latLng: LngLatLike;
}

export default function MapMarker({ color, latLng }: MapMarkerProps) {
  const id = useId();
  const dispatch = useAppDispatch();

  const [marker, setMarker] = useState(new Marker({ color }));

  useEffect(() => {
    setMarker(new Marker({ color }));
  }, [color]);

  useEffect(() => {
    marker.setLngLat(latLng);
  }, [marker, latLng]);

  useEffect(() => {
    dispatch(addMarker({ id, marker }));

    return () => {
      dispatch(removeMarker({ id }));
    };
  }, [dispatch, id, marker]);

  return null;
}