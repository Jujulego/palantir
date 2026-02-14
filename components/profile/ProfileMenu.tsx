'use client';

import ColorModeToggle from '@/components/ColorModeToggle';
import ProfileLinks from '@/components/profile/ProfileLinks';
import ProfileMenuSurface from '@/components/profile/ProfileMenuSurface';
import UserAvatar from '@/components/users/UserAvatar';
import { useProfile } from '@/lib/auth/useProfile';
import { useResizeObserver } from '@/lib/utils/useResizeObserver';
import IconButton from '@mui/material/IconButton';
import { useCallback, useState } from 'react';

export interface ProfileMenuProps {
  readonly className?: string;
}

export default function ProfileMenu({ className }: ProfileMenuProps) {
  const { profile = null } = useProfile();

  const [isOpen, setIsOpen] = useState(false);
  const { ref: resizeRef, height: contentHeight } = useResizeObserver<HTMLDivElement>();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((old) => !old);
  }, []);

  return (
    <ProfileMenuSurface
      className={className}
      fullHeight={contentHeight + 48}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div className="flex items-center gap-4 p-1 w-[320px] rounded-t-(--ProfileMenuSurface-shape) elevation-2 bg-background-paper">
        <IconButton className="p-1" aria-label="Profile menu" onClick={handleToggle}>
          <UserAvatar size={32} user={profile} />
        </IconButton>

        <h6 className="grow shrink-0 basis-0 truncate">
          {profile?.nickname ?? profile?.name ?? 'Anonymous'}
        </h6>

        <ColorModeToggle />
      </div>

      <div className="w-[320px]" ref={resizeRef}>
        <ProfileLinks profile={profile} onClose={handleClose} />
      </div>
    </ProfileMenuSurface>
  );
}
