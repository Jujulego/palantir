'use client';

import ColorModeToggle from '@/components/ColorModeToggle';
import UserAvatar from '@/components/users/UserAvatar';
import { useProfile } from '@/lib/auth/useProfile';
import type { UserDto } from '@/lib/users/user.dto';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { type MouseEvent, Suspense, useCallback, useState } from 'react';

export default function ProfileMenu() {
  const { profile = null } = useProfile();
  const pathname = usePathname();

  // Popover state
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const handleClose = useCallback(() => setAnchor(null), []);
  const handleOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  }, []);

  // Render
  return (
    <>
      <IconButton onClick={handleOpen} aria-label="Profile menu" sx={{ padding: 0.5 }}>
        <UserAvatar size={32} user={profile as UserDto | null} />
      </IconButton>

      <Popover
        open={!!anchor}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        disablePortal
        slotProps={{
          paper: {
            sx: {
              marginTop: -1.25,
              marginLeft: 0.5,
              borderTopRightRadius: 24,
              borderTopLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderBottomLeftRadius: 8,
            }
          }
        }}
      >
        <ProfileTopBar>
          <UserAvatar user={profile as UserDto | null} sx={{ flex: '0 0 auto' }} />

          <h6 className="grow shrink-0 basis-0">
            {profile?.nickname ?? profile?.name ?? 'Anonymous'}
          </h6>

          <ColorModeToggle sx={{ mb: 'auto' }} />
        </ProfileTopBar>

        <Divider />

        <List component="nav" disablePadding onClick={handleClose}>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/server/me/vercel"
              selected={pathname.startsWith('/server/me')}
            >
              <ListItemIcon>
                <GpsFixedIcon />
              </ListItemIcon>

              <ListItemText>My IP address</ListItemText>
            </ListItemButton>
          </ListItem>

          { profile && (
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/console" selected={pathname.startsWith('/console')}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>

                <ListItemText primary="Console" />
              </ListItemButton>
            </ListItem>
          ) }
        </List>

        <Divider />

        <List component="nav" disablePadding onClick={handleClose}>
          { profile ? (
            <ListItem disablePadding>
              <ListItemButton component="a" href="/auth/logout">
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>

                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          ) : (
            <Suspense fallback={<BasicLoginLink />}>
              <CompleteLoginLink />
            </Suspense>
          ) }
        </List>
      </Popover>
    </>
  );
}

// Elements
const ProfileTopBar = styled('div')(({ theme }) => ({
  minHeight: 48,
  minWidth: 320,

  display: 'flex',
  alignItems: 'center',

  padding: theme.spacing(1.25),
  gap: theme.spacing(2),
}));

function BasicLoginLink() {
  const url = usePathname();

  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={`/auth/login?returnTo=${encodeURIComponent(url)}`}>
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>

        <ListItemText primary="Login" />
      </ListItemButton>
    </ListItem>
  );
}

function CompleteLoginLink() {
  const url = `${usePathname()}?${useSearchParams()}`;

  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={`/auth/login?returnTo=${encodeURIComponent(url)}`}>
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>

        <ListItemText primary="Login" />
      </ListItemButton>
    </ListItem>
  );
}
