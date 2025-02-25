'use client';

import VirtualCell from '@/components/table/VirtualCell';
import VirtualRow, { type VirtualRowProps } from '@/components/table/VirtualRow';
import FormatDate from '@/components/utils/FormatDate';
import type { UserDto } from '@/lib/users/users';
import { mergeSx } from '@/lib/utils/mui';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

// Component
export interface VirtualUserRowProps extends VirtualRowProps {
  readonly user: UserDto;
}

export default function UserRow({ user, sx, ...rest }: VirtualUserRowProps) {
  const router = useRouter();
  
  const handleClick = useCallback(() => {
    router.push(`/console/auth/users/${user.user_id}`);
  }, [router, user.user_id]);

  return (
    <VirtualRow {...rest} hover onClick={handleClick} sx={mergeSx({ cursor: 'pointer' }, sx)}>
      <VirtualCell scope="row" sx={{ display: 'flex', alignItems: 'center', py: 0, gap: 1 }}>
        <Avatar src={user.picture} alt={user.nickname ?? user.name} sx={{ height: 24, width: 24 }} />
        <span>{user.nickname ?? user.name}</span>
      </VirtualCell>

      <VirtualCell sx={{ display: 'flex', alignItems: 'center', py: 0, gap: 1 }}>
        {user.identities.map((identity) => {
          switch (identity.connection) {
            case 'github':
              return <GitHubIcon key={identity.connection}/>;

            case 'Username-Password-Authentication':
              return <PersonIcon key={identity.connection}/>;

            default:
              return <PersonOutlineIcon key={identity.connection}/>;
          }
        })}
      </VirtualCell>

      <VirtualCell>
        <FormatDate date={user.last_login} format="lll" />
      </VirtualCell>
    </VirtualRow>
  );
}
