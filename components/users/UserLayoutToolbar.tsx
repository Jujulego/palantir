import UserAvatar from '@/components/users/UserAvatar';
import { queryUser } from '@/lib/users/users';
import type { SxProps, Theme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Component
export interface UserLayoutToolbarProps {
  readonly userId: string;
  readonly sx?: SxProps<Theme>;
}

export default async function UserLayoutToolbar({ userId, sx }: UserLayoutToolbarProps) {
  const user = await queryUser(userId);

  return (
    <Toolbar sx={sx}>
      <UserAvatar user={user} sx={{ height: 48, width: 48, mr: 2 }}  />

      <Typography component="h1" variant="h4" sx={{ mr: 'auto' }}>
        { user?.nickname ?? user?.name }
      </Typography>
    </Toolbar>
  );
}
