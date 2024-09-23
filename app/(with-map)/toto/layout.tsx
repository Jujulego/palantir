import ColorModeToggle from '@/components/common/ColorModeToggle';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import type { ReactNode } from 'react';

// Component
export interface TotoLayoutProps {
  readonly children: ReactNode;
}

export default function TotoLayout({ children }: TotoLayoutProps) {
  return <>
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
  </>;
}