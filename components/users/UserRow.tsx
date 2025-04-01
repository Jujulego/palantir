'use client';

import VirtualCell from '@/components/virtual/VirtualCell';
import VirtualRow, { type VirtualRowProps } from '@/components/virtual/VirtualRow';
import UserAvatar from '@/components/users/UserAvatar';
import UserEmail from '@/components/users/UserEmail';
import UserIdentities from '@/components/users/UserIdentities';
import FormatDate from '@/components/utils/FormatDate';
import type { UserDto } from '@/lib/users/user.dto';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Link from 'next/link';

// Component
export interface VirtualUserRowProps extends VirtualRowProps {
  readonly user: UserDto;
}

export default function UserRow({ user, ...rest }: VirtualUserRowProps) {
  return (
    <VirtualRow {...rest} hover>
      <VirtualCell scope="row" padding="none">
        <ButtonBase
          component={Link}
          href={`/console/auth/users/${encodeURIComponent(user.user_id)}`}
          sx={{
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            px: 2,

            display: 'flex',
            justifyContent: 'unset',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <UserAvatar user={user} size={24} />
          <Box sx={{ flex: '1 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user.nickname ?? user.name}
          </Box>
        </ButtonBase>
      </VirtualCell>

      <VirtualCell>
        <UserEmail user={user} />
      </VirtualCell>

      <VirtualCell sx={{ display: 'flex', alignItems: 'center', py: 0, gap: 1 }}>
        <UserIdentities identities={user.identities} />
      </VirtualCell>

      <VirtualCell>
        { user.logins_count ?? 0 }
      </VirtualCell>

      <VirtualCell>
        <FormatDate date={user.last_login} format="lll" />
      </VirtualCell>
    </VirtualRow>
  );
}
