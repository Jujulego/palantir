import StoreProvider from '@/components/StoreProvider';
import Skeleton from '@mui/material/Skeleton';
import { lazy, type ReactNode, Suspense } from 'react';

// Lazy
const MapboxMap = lazy(() => import('@/components/mapbox/MapboxMap'));

// Component
export interface WithMapLayoutProps {
  readonly children?: ReactNode;
}

export default function WithMapLayout({ children }: WithMapLayoutProps) {
  return (
    <StoreProvider>
      <Suspense fallback={<Skeleton variant="rectangular" sx={{ height: '100vh', width: '100vw' }} />}>
        <MapboxMap sx={{ height: '100vh', width: '100vw' }} />
      </Suspense>

      { children }
    </StoreProvider>
  );
}
