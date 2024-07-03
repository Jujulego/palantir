'use client';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import NoSsr from '@mui/material/NoSsr';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import { useColorScheme, type SxProps } from '@mui/material/styles';
import { useCallback } from 'react';

// Component
export interface ColorModeToggleProps {
  readonly sx?: SxProps;
}

export default function ColorModeToggle({ sx }: ColorModeToggleProps) {
  const { mode, systemMode, setMode } = useColorScheme();
  const actualMode = mode === 'system' ? systemMode : mode;

  const handleClick = useCallback(() => {
    setMode(actualMode === 'dark' ? 'light' : 'dark');
  }, [actualMode, setMode]);

  // Render
  return (
    <Paper sx={[{ borderRadius: 9999 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <NoSsr fallback={<Skeleton variant="circular" width={40} height={40} sx={{ m: 0.5 }} />}>
        <IconButton
          color="inherit" aria-label="Switch theme"
          onClick={handleClick}
          sx={{ m: 0.5 }}
        >
            { actualMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon /> }
        </IconButton>
      </NoSsr>
    </Paper>
  );
}
