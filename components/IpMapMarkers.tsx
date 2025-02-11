'use client';

import MapMarker from '@/components/map/MapMarker';
import { ipSources, SourceId } from '@/data/sources';
import type { Location } from '@/lib/utils/location';
import { collect$, filter$, map$, pipe$ } from 'kyrielle';
import { useRef } from 'react';

// Component
export interface IpMapMarkersProps {
  readonly sourceId: SourceId;
  readonly coordinates?: Location;
}

export default function IpMapMarkers({ sourceId, coordinates }: IpMapMarkersProps) {
  const markersRef = useRef<Partial<Record<SourceId, Location>>>({});
  const sourceIdRef = useRef(new Set<SourceId>());

  markersRef.current[sourceId] = coordinates;
  sourceIdRef.current.delete(sourceId);
  sourceIdRef.current.add(sourceId);

  return pipe$(
    sourceIdRef.current,
    filter$((source) => !!markersRef.current[source]),
    map$((source) => (
      <MapMarker
        key={source}
        latitude={markersRef.current[source]!.latitude}
        longitude={markersRef.current[source]!.longitude}
        tooltip={ipSources[source].name}
        selected={source === sourceId}
        sx={{ color: ipSources[source].color }}
      />
    )),
    collect$()
  ).reverse();
}
