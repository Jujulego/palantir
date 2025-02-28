'use client';

import VirtualCell from '@/components/table/VirtualCell';
import VirtualRow, { type VirtualRowProps } from '@/components/table/VirtualRow';
import UserAvatar from '@/components/users/UserAvatar';
import UserEmail from '@/components/users/UserEmail';
import UserIdentities from '@/components/users/UserIdentities';
import FormatDate from '@/components/utils/FormatDate';
import type { UserDto } from '@/lib/users/user.dto';
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
            px: 2,

            display: 'flex',
            justifyContent: 'unset',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <UserAvatar user={user} sx={{ height: 24, width: 24 }} />
          <span>{user.nickname ?? user.name}</span>
        </ButtonBase>
      </VirtualCell>

      <VirtualCell sx={{ py: 0 }}>
        <UserEmail user={user} sx={{ height: '100%' }} />
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
