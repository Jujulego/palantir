'use client';

import UserAvatar from '@/components/users/UserAvatar';
import UserEmail from '@/components/users/UserEmail';
import UserIdentities from '@/components/users/UserIdentities';
import FormatDate from '@/components/utils/FormatDate';
import VirtualCell from '@/components/virtual/VirtualCell';
import VirtualRow, { type VirtualRowProps } from '@/components/virtual/VirtualRow';
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
          <div className="grow shrink-0 basis-0 overflow-hidden text-ellipsis whitespace-nowrap">
            {user.nickname ?? user.name}
          </div>
        </ButtonBase>
      </VirtualCell>

      <VirtualCell sx={{ display: { '@xs': 'none', '@md': 'block' } }}>
        <UserEmail user={user} />
      </VirtualCell>

      <VirtualCell sx={{ display: { '@xs': 'none', '@sm': 'flex' }, alignItems: 'center', py: 0, gap: 1 }}>
        <UserIdentities identities={user.identities} />
      </VirtualCell>

      <VirtualCell sx={{ display: { '@xs': 'none', '@md': 'block' } }}>
        { user.logins_count ?? 0 }
      </VirtualCell>

      <VirtualCell>
        <FormatDate date={user.last_login} format="lll" />
      </VirtualCell>
    </VirtualRow>
  );
}
