'use client';

import ConsoleDrawer from '@/components/console/ConsoleDrawer';
import ConsoleHomeLink from '@/components/console/ConsoleHomeLink';
import ProfileMenu from '@/components/profile/ProfileMenu';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { useCallback, useState } from 'react';

// Layout
export default function ConsoleLayout({ children }: LayoutProps<'/console'>) {
  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCloseDrawer = useCallback(() => setDrawerOpen(false), []);
  const handleToggleDrawer = useCallback(() => setDrawerOpen((old) => !old), []);

  // Render
  return (
    <Box
      sx={{
        display: 'flex',
        '--mui-palette-TableCell-border': 'var(--mui-palette-divider)'
      }}
    >
      <AppBar position="fixed" elevation={2}>
        <Toolbar disableGutters sx={{ px: 2 }}>
          <IconButton onClick={handleToggleDrawer} color="inherit" sx={{ display: { lg: 'none' } }}>
            <MenuIcon />
          </IconButton>

          <ConsoleHomeLink sx={{ mr: 'auto' }} />

          <ProfileMenu />
        </Toolbar>
      </AppBar>

      <ConsoleDrawer open={drawerOpen} onClose={handleCloseDrawer} />

      <Stack
        component="main"
        sx={{
          containerType: 'inline-size',
          height: '100vh',
          flex: '1 0 0',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        { children }
      </Stack>
    </Box>
  );
}
