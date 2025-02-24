'use client';

import VirtualCell from '@/components/table/VirtualCell';
import VirtualRow from '@/components/table/VirtualRow';
import VirtualTable from '@/components/table/VirtualTable';
import FormatDate from '@/components/utils/FormatDate';
import type { UserDto } from '@/lib/auth/users';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Avatar from '@mui/material/Avatar';
import type { SxProps, Theme } from '@mui/material/styles';

export interface UsersTableProps {
  readonly users: UserDto[];
  readonly userCount: number;
  readonly sx?: SxProps<Theme>;
}

export default function UsersTable({ users, userCount, sx }: UsersTableProps) {
  return (
    <VirtualTable
      aria-rowcount={userCount + 1}
      columnLayout="1fr 1fr 1fr"
      rowCount={userCount}
      sx={sx}

      head={
        <VirtualRow aria-rowindex={1}>
          <VirtualCell scope="col" size="small">Name</VirtualCell>
          <VirtualCell scope="col" size="small">Identities</VirtualCell>
          <VirtualCell scope="col" size="small">Last login</VirtualCell>
        </VirtualRow>
      }
      row={(idx) => {
        const user = users[idx];

        if (!user) {
          return null;
        }

        return (
          <VirtualRow key={user.user_id + '-' + idx} aria-rowindex={idx + 2} rowIndex={idx} hover>
            <VirtualCell scope="row" sx={{ display: 'flex', alignItems: 'center', py: 0, gap: 1 }}>
              <Avatar src={user.picture} sx={{ height: 24, width: 24 }}>
                {(user.nickname ?? user.name ?? '').charAt(0).toUpperCase()}
              </Avatar>
              {user.nickname ?? user.name}
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
      }}
    />
  );
}