'use client';

import ProfileLoginLink from '@/components/profile/ProfileLoginLink';
import type { User } from '@auth0/nextjs-auth0/types';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEventHandler } from 'react';

export interface ProfileLinksProps {
  readonly profile: User | null;
  readonly onClose?: MouseEventHandler<HTMLElement>;
}

export default function ProfileLinks({ profile, onClose }: ProfileLinksProps) {
  const pathname = usePathname();

  return (<>
    <List component="nav" disablePadding onClick={onClose}>
      <ListItem component="div" disablePadding>
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
        <ListItem component="div" disablePadding>
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

    <List component="nav" disablePadding onClick={onClose}>
      { profile ? (
        <ListItem component="div" disablePadding>
          <ListItemButton component="a" href="/auth/logout">
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>

            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      ) : (
        <ProfileLoginLink />
      ) }
    </List>
  </>);
}
