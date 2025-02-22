'use client';

import { useUser } from '@auth0/nextjs-auth0';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

export default function ProfileMenu() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Skeleton variant="circular" width={40} height={40} />;
  }

  return (
    <Avatar alt={user?.nickname ?? user?.name} src={user?.picture} />
  );
}
