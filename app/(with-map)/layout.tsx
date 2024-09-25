import MapboxMap from '@/components/mapbox/MapboxMap';
import type { ReactNode } from 'react';

export interface WithMapLayoutProps {
  readonly children: ReactNode;
}

export default function WithMapLayout({ children }: WithMapLayoutProps) {
  return (
    <MapboxMap>
      { children }
    </MapboxMap>
  );
}