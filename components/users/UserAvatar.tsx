import type { UserDto } from '@/lib/users/user.dto';
import { mergeSx } from '@/lib/utils/mui';
import type { AvatarProps } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { getImageProps } from 'next/image';

export interface UserAvatarProps extends Omit<AvatarProps, 'alt' | 'children' | 'src'> {
  readonly size?: number;
  readonly user: UserDto | null;
}

export default function UserAvatar({ size = 40, user, sx, ...rest }: UserAvatarProps) {
  if (user?.picture) {
    const { props: { srcSet, alt, ...imgProps } } = getImageProps({
      alt: user.nickname ?? user.name ?? '',
      src: user.picture,
      width: size,
      height: size,
    });

    return (
      <Avatar
        {...rest}
        alt={alt}
        srcSet={srcSet}
        slotProps={{ img: imgProps }}
        sx={mergeSx(sx, { height: size, width: size })}
      />
    );
  }

  return (
    <Avatar
      {...rest}
      alt={user?.nickname ?? user?.name}
      sx={mergeSx(sx, { height: size, width: size })}
    />
  );
}
