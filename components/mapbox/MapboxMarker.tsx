'use client';

import { useAppDispatch } from '@/state/hooks';
import { putMarker, removeMarker } from '@/state/markers/actions';
import type { LngLatLike } from 'mapbox-gl';
import { useEffect, useId } from 'react';

// Component
export interface MapMarkerProps {
  readonly color?: string;
  readonly lngLat: LngLatLike;
}

export default function MapboxMarker({ color, lngLat }: MapMarkerProps) {
  const id = useId();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(putMarker({
      id,
      marker: { color, lngLat }
    }));

    return () => {
      dispatch(removeMarker({ id }));
    };
  }, [dispatch, id, color, lngLat]);

  return null;
}
