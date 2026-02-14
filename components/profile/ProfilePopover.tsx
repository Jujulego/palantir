'use client';

import ColorModeToggle from '@/components/ColorModeToggle';
import ProfileLinks from '@/components/profile/ProfileLinks';
import UserAvatar from '@/components/users/UserAvatar';
import { useProfile } from '@/lib/auth/useProfile';
import type { UserDto } from '@/lib/users/user.dto';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import { type MouseEvent, useCallback, useState } from 'react';

export default function ProfilePopover() {
  const { profile = null } = useProfile();

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
            className: 'rounded-lg -mt-2.5 ml-1',
          }
        }}
      >
        <div className="min-h-12 min-w-[320px] flex items-center p-2.5 gap-4">
          <UserAvatar user={profile as UserDto | null} sx={{ flex: '0 0 auto' }} />

          <h6 className="grow shrink-0 basis-0">
            {profile?.nickname ?? profile?.name ?? 'Anonymous'}
          </h6>

          <ColorModeToggle className="mb-auto" />
        </div>

        <Divider />

        <ProfileLinks profile={profile} onClose={handleClose} />
      </Popover>
    </>
  );
}
