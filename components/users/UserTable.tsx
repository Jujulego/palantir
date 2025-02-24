'use client';

import VirtualCell from '@/components/table/VirtualCell';
import VirtualRow from '@/components/table/VirtualRow';
import VirtualTable, { type RowFn } from '@/components/table/VirtualTable';
import UserRow from '@/components/users/UserRow';
import UserRowSkeleton from '@/components/users/UserRowSkeleton';
import type { UserDto } from '@/lib/auth/users';
import type { SxProps, Theme } from '@mui/material/styles';

// Component
export interface UsersTableProps {
  readonly users: UserDto[];
  readonly userCount: number;
  readonly sx?: SxProps<Theme>;
}

export default function UserTable({ users, userCount, sx }: UsersTableProps) {
  return (
    <VirtualTable
      columnLayout="1fr 1fr 1fr"
      data={users}
      head={
        <VirtualRow aria-rowindex={1}>
          <VirtualCell scope="col" size="small">Name</VirtualCell>
          <VirtualCell scope="col" size="small">Identities</VirtualCell>
          <VirtualCell scope="col" size="small">Last login</VirtualCell>
        </VirtualRow>
      }
      row={userRow}
      rowCount={userCount}
      sx={sx}

      aria-rowcount={userCount + 1}
    />
  );
}

// Utils
const userRow: RowFn<UserDto[]> = ({ index, data: users }) => {
  const user = users[index];

  if (!user) {
    return <UserRowSkeleton key={index} rowIndex={index} aria-rowindex={index + 2} />;
  }

  return <UserRow key={index} rowIndex={index} user={user} aria-rowindex={index + 2} />;
};