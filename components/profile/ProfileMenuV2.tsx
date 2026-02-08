'use client';

import ColorModeToggle from '@/components/ColorModeToggle';
import ProfileLoginLink from '@/components/profile/ProfileLoginLink';
import ProfileMenuSurface from '@/components/profile/ProfileMenuSurface';
import UserAvatar from '@/components/users/UserAvatar';
import { useProfile } from '@/lib/auth/useProfile';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';

export interface ProfileMenuV2Props {
  readonly className?: string;
}

export default function ProfileMenuV2({ className }: ProfileMenuV2Props) {
  const pathname = usePathname();

  const { profile = null } = useProfile();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((old) => !old);
  }, []);

  return (
    <ProfileMenuSurface className={className} isOpen={isOpen} fullHeight={profile ? 192 : 144}>
      <div className="flex items-center gap-4 p-1 w-[320px] rounded-(--ProfileMenuSurface-shape) shadow-2">
        <IconButton className="p-1" aria-label="Profile menu" onClick={handleToggle}>
          <UserAvatar
            size={32}
            user={profile}
          />
        </IconButton>

        <h6 className="grow shrink-0 basis-0 truncate">
          {profile?.nickname ?? profile?.name ?? 'Anonymous'}
        </h6>

        <ColorModeToggle />
      </div>

      <List className="w-[320px]" component="nav" disablePadding onClick={handleClose}>
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

      <List component="nav" disablePadding onClick={handleClose}>
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
    </ProfileMenuSurface>
  );
}
