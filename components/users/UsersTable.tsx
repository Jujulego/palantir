'use client';

import TableCell from '@/components/table/TableCell';
import TableRow from '@/components/table/TableRow';
import VirtualTable from '@/components/table/VirtualTable';
import FormatDate from '@/components/utils/FormatDate';
import type { UserDto } from '@/lib/auth/users';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export interface UsersTableProps {
  readonly users: UserDto[];
}

export default function UsersTable({ users }: UsersTableProps) {
  return (
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
  );
}