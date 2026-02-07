'use client';

import ProfileMenuSurface from '@/components/profile/ProfileMenuSurface';
import UserAvatar from '@/components/users/UserAvatar';
import { useProfile } from '@/lib/auth/useProfile';
import type { UserDto } from '@/lib/users/user.dto';
import IconButton from '@mui/material/IconButton';
import { useCallback, useState } from 'react';

export interface ProfileMenuV2Props {
  readonly className?: string;
}

export default function ProfileMenuV2({ className }: ProfileMenuV2Props) {
  const { profile = null } = useProfile();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((old) => !old);
  }, []);

  return (
    <ProfileMenuSurface className={className} isOpen={isOpen}>
      <IconButton className="m-1 p-1" aria-label="Profile menu" onClick={handleToggle}>
        <UserAvatar size={32} user={profile as UserDto | null} />
      </IconButton>
    </ProfileMenuSurface>
  );
}
