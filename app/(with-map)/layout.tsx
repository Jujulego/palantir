import StoreProvider from '@/components/StoreProvider';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

// Lazy
const MapboxMap = dynamic(() => import('@/components/mapbox/MapboxMap'), { ssr: true });

// Component
export interface WithMapLayoutProps {
  readonly children?: ReactNode;
}

export default function WithMapLayout({ children }: WithMapLayoutProps) {
  return (
    <StoreProvider>
      <MapboxMap sx={{ height: '100vh', width: '100vw' }} />
      { children }
    </StoreProvider>
  );
}