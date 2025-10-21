'use client';

import MapMarker, { type MapMarkerProps } from '@/components/map/MapMarker';
import { ServerMarkersContext } from '@/components/server/server-markers.context';
import NoSsr from '@mui/material/NoSsr';
import { type ReactNode, useCallback, useState } from 'react';

export interface ServerMarkersProps {
  readonly children: ReactNode;
}

export default function ServerMarkers({ children }: ServerMarkersProps) {
  const [markers, setMarkers] = useState<Readonly<Record<string, MapMarkerProps>>>({});
  const [selectedMarker, setSelectedMarker] = useState<string>();

  const createMarker = useCallback((key: string, props: MapMarkerProps) => {
    setMarkers((old) => ({ ...old, [key]: props }));
  }, []);

  const selectMarker = useCallback((key: string) => {
    setSelectedMarker(key);
  }, []);

  return (
    <ServerMarkersContext value={{ createMarker, selectMarker, selectedMarker }}>
      { children }

      <NoSsr>
        { Object.entries(markers).map(([key, props]) => (
          <MapMarker key={key} {...props} />
        )) }
      </NoSsr>
    </ServerMarkersContext>
  );
}