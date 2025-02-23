import HomeLink from '@/components/HomeLink';
import ProfileMenu from '@/components/profile/ProfileMenu';
import PeopleIcon from '@mui/icons-material/People';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

// Layout
export interface ConsoleLayoutProps {
  readonly children: ReactNode;
}

export default async function ConsoleLayout({ children }: ConsoleLayoutProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" elevation={2}>
        <Toolbar>
          <HomeLink sx={{ mr: 'auto' }} />

          <ProfileMenu />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          flex: '0 0 auto',
          width: 320,

          '& .MuiDrawer-paper': {
            width: 320,
          }
        }}
      >
        <Toolbar />

        <List
          component="nav"
          subheader={
            <ListSubheader component="h6" sx={{ m: 0, lineHeight: '36px' }}>
              Authentication
            </ListSubheader>
          }
        >
          <ListItem component="div" disablePadding>
            <ListItemButton component={Link} href="/console/auth/users">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>

              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Stack component="main" sx={{ height: '100vh', flex: '1 0 0', overflow: 'auto' }}>
        <Toolbar />
        { children }
      </Stack>
    </Box>
  );
}

export const metadata: Metadata = {
  title: {
    default: 'Palantir Console',
    template: 'Console - %s',
  },
};
