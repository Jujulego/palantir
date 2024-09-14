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

export default function MapboxMarker({ color, latLng }: MapMarkerProps) {
  const id = useId();
  const dispatch = useAppDispatch();

  const [marker, setMarker] = useState<Marker>();

  useEffect(() => {
    setMarker(new Marker({ color }));
  }, [color]);

  useEffect(() => {
    marker?.setLngLat(latLng);
  }, [marker, latLng]);

  useEffect(() => {
    if (!marker) return;

    dispatch(addMarker({ id, marker }));
    return () => void dispatch(removeMarker({ id }));
  }, [dispatch, id, marker]);

  return null;
}