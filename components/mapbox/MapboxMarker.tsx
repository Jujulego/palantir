'use client';

import { useAppDispatch } from '@/state/hooks';
import { putMarker, removeMarker } from '@/state/markers/actions';
import { memo, useEffect, useId } from 'react';

// Component
export interface MapMarkerProps {
  readonly lng: number;
  readonly lat: number;
  readonly color?: string;
}

const MapboxMarker = memo(function MapboxMarker({ color, lng, lat }: MapMarkerProps) {
  const id = useId();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(putMarker({
      id,
      marker: { color, lngLat: { lng, lat } }
    }));

    return () => {
      dispatch(removeMarker({ id }));
    };
  }, [dispatch, id, color, lng, lat]);

  return null;
});

export default MapboxMarker;
