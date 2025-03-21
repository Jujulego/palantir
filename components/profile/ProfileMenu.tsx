'use client';

import ColorModeToggle from '@/components/ColorModeToggle';
import UserAvatar from '@/components/users/UserAvatar';
import type { UserDto } from '@/lib/users/user.dto';
import { useUser } from '@auth0/nextjs-auth0';
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
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useRef, useState } from 'react';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

export default function ProfileMenu() {
  const { user = null, isLoading } = useUser();
  const pathname = usePathname();
  const anchorEl = useRef<HTMLButtonElement>(null);

  // Open state
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  // Render
  return (
    <>
      { isLoading ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : (
        <IconButton ref={anchorEl} onClick={handleOpen} aria-label="Profile menu" sx={{ padding: 0.5 }}>
          <UserAvatar size={32} user={user as UserDto | null} />
        </IconButton>
      ) }

      <Popover
        open={isOpen}
        anchorEl={anchorEl.current}
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
              marginTop: -1,
              marginLeft: 0.5,
              borderTopRightRadius: 24,
              borderTopLeftRadius: 16,
              borderBottomRightRadius: 16,
              borderBottomLeftRadius: 16,
            }
          }
        }}
      >
        <ProfileTopBar>
          <UserAvatar user={user as UserDto | null} sx={{ flex: '0 0 auto' }} />

          <Typography component="h6" sx={{ flex: '1 0 0' }}>{user?.nickname ?? user?.name ?? 'Anonymous'}</Typography>

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

          { user && (
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
          { user ? (
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
  minHeight: 40,
  minWidth: 320,

  display: 'flex',
  alignItems: 'center',

  padding: theme.spacing(1),
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