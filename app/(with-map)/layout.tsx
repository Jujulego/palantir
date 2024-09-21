import { Container } from '@/app/(with-map)/utils';
import ColorModeToggle from '@/components/common/ColorModeToggle';
import StoreProvider from '@/components/StoreProvider';
import type { Theme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import type { SxProps } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
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
      <Container>
        <Suspense fallback={<Skeleton variant="rectangular" sx={mapStyle} />}>
          <MapboxMap sx={mapStyle} />
        </Suspense>

        <Toolbar
          component="header"
          sx={{
            flexShrink: 0,
            zIndex: 'appBar',
            pointerEvents: 'none',

            '& > *': {
              pointerEvents: 'auto',
            }
          }}
        >
          <Paper sx={{ ml: 'auto', p: 0.5, borderRadius: 9999 }}>
            <ColorModeToggle />
          </Paper>
        </Toolbar>

        { children }
      </Container>
    </StoreProvider>
  );
}

// Utils
const mapStyle: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100vh',
  width: '100vw'
} as const;