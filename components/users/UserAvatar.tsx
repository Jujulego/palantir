import type { UserDto } from '@/lib/users/user.dto';
import type { AvatarProps } from '@mui/material';
import Avatar from '@mui/material/Avatar';

export interface UserAvatarProps extends Omit<AvatarProps, 'alt' | 'children' | 'src'> {
  readonly user: UserDto | null;
}

export default function UserAvatar({ user, ...rest }: UserAvatarProps) {
  return <Avatar {...rest} src={user?.picture} alt={user?.nickname ?? user?.name} />;
}
