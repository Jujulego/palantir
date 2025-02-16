'use client';

import MapMarker, { type MapMarkerProps } from '@/components/map/MapMarker';
import { ServerMarkersContext } from '@/components/server/server-markers.context';
import { type ReactNode, useCallback, useRef, useState } from 'react';

export interface ServerMarkersProps {
  readonly children: ReactNode;
}

export default function ServerMarkers({ children }: ServerMarkersProps) {
  const markers = useRef(new Map<string, MapMarkerProps>());
  const [selectedMarker, setSelectedMarker] = useState<string>();

  const createMarker = useCallback((key: string, props: MapMarkerProps) => {
    markers.current.set(key, props);
  }, []);

  const selectMarker = useCallback((key: string) => {
    setSelectedMarker(key);
  }, []);

  return (
    <ServerMarkersContext value={{ createMarker, selectMarker, selectedMarker }}>
      { children }

      { Array.from(markers.current).map(([key, props]) => (
        <MapMarker key={key} {...props} />
      )) }
    </ServerMarkersContext>
  );
}