'use client';

import { useMapboxMap } from '@/src/mapbox/Mapbox.context';
import { LngLatLike } from 'mapbox-gl';
import { useEffect, useMemo } from 'react';

import { IpGeolocationResult } from '@/src/ip-geolocation/actions';
import MapboxMarker from '@/src/mapbox/MapboxMarker';

// Component
export interface IpGeolocationMarkerProps {
  readonly result: IpGeolocationResult;
}

export default function IpGeolocationMarker({ result }: IpGeolocationMarkerProps) {
  const map = useMapboxMap();
  const lngLat = useMemo<LngLatLike>(() => [parseFloat(result.longitude), parseFloat(result.latitude)], [result]);

  useEffect(() => {
    map.flyTo({ center: lngLat, zoom: 4 });
  }, [map, lngLat]);

  return <MapboxMarker lngLat={lngLat} />;
}
