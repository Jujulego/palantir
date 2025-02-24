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
      columnLayout="1fr 1fr 1fr"
      data={users}

      head={
        <VirtualRow rowIndex={0}>
          <VirtualCell scope="col" size="small">Name</VirtualCell>
          <VirtualCell scope="col" size="small">Last login</VirtualCell>
          <VirtualCell scope="col" size="small">Identities</VirtualCell>
        </VirtualRow>
      }

      row={(idx, users) => {
        const user = users[idx];

        return (
          <VirtualRow key={user.user_id} rowIndex={idx} hover>
            <VirtualCell scope="row" sx={{ display: 'flex', alignItems: 'center', py: 0, gap: 1 }}>
              <Avatar src={user.picture} sx={{ height: 24, width: 24 }}>
                {(user.nickname ?? user.name ?? '').charAt(0).toUpperCase()}
              </Avatar>
              {user.nickname ?? user.name}
            </VirtualCell>
            <VirtualCell>
              <FormatDate date={user.last_login} format="lll" />
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
          </VirtualRow>
        );
      }}
      rowKey={(idx, users) => users[idx].user_id + '-' + idx}
      rowCount={userCount}

      sx={sx}
    />
  );

  /*return (
    <VirtualTable
      headerRow={
        <TableRow>
          <TableCell scope="col" size="small">Name</TableCell>
          <TableCell scope="col" size="small">Identities</TableCell>
          <TableCell scope="col" size="small">Last login</TableCell>
        </TableRow>
      }
      headerSize={36}

      rowData={users}
      rowCount={users.length}
      rowKey={(idx, users) => users[idx].user_id}
      row={(idx, users, style) => {
        const user = users[idx];

        return (
          <TableRow key={user.user_id} hover style={style}>
            <TableCell scope="row" sx={{ display: 'flex', alignItems: 'center', py: 0 }}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Avatar src={user.picture} sx={{ height: 24, width: 24 }}>
                  {(user.nickname ?? user.name ?? '').charAt(0).toUpperCase()}
                </Avatar>
                {user.nickname ?? user.name}
              </Stack>
            </TableCell>
            <TableCell sx={{ display: 'flex', alignItems: 'center', py: 0, gap: 1 }}>
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
            </TableCell>
            <TableCell>
              <FormatDate date={user.last_login} format="lll"/>
            </TableCell>
          </TableRow>
        );
      }}

      sx={{ flex: '1 0 0' }}
    />
  );*/
}