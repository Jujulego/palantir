import UserAvatar from '@/components/users/UserAvatar';
import { queryUser } from '@/lib/users/users';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface UserLayoutHeadingProps {
  readonly userId: string;
}

export default async function UserLayoutHeading({ userId }: UserLayoutHeadingProps) {
  const user = await queryUser(userId);

  return (
    <Box sx={{ display: 'flex', mx: 3, mb: 3 }}>
      <UserAvatar user={user} sx={{ height: 48, width: 48, mr: 2 }}  />

      <Typography component="h1" variant="h4">
        { user?.nickname ?? user?.name }
      </Typography>
    </Box>
  );
}
