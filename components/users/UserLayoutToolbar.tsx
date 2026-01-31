import LinkAccountButton from '@/components/users/LinkAccountButton';
import UserAvatar from '@/components/users/UserAvatar';
import { queryUser } from '@/lib/users/users';
import type { SxProps, Theme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

// Component
export interface UserLayoutToolbarProps {
  readonly userId: string;
  readonly sx?: SxProps<Theme>;
}

export default async function UserLayoutToolbar({ userId, sx }: UserLayoutToolbarProps) {
  const user = await queryUser(userId);

  return (
    <Toolbar sx={sx}>
      <UserAvatar user={user} size={48} sx={{ mr: 2 }}  />

      <h1 className="typography-h4 mr-auto">
        { user?.nickname ?? user?.name }
      </h1>

      <LinkAccountButton disabled={!user?.email_verified} userId={userId} />
    </Toolbar>
  );
}
