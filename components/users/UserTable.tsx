'use client';

import UserRow from '@/components/users/UserRow';
import UserRowSkeleton from '@/components/users/UserRowSkeleton';
import VirtualCell from '@/components/virtual/VirtualCell';
import VirtualRow from '@/components/virtual/VirtualRow';
import VirtualTable, { type RowFn, type RowInterval } from '@/components/virtual/VirtualTable';
import type { UserDto } from '@/lib/users/user.dto';
import { useUserCount } from '@/lib/users/useUserCount';
import { USER_PAGE_SIZE, useUsers } from '@/lib/users/useUsers';
import type { TableProps } from '@mui/material/Table';
import { useCallback, useMemo } from 'react';

// Component
export interface UsersTableProps extends TableProps {
  readonly users?: UserDto[];
  readonly userCount?: number;
}

export default function UserTable(props: UsersTableProps) {
  const { users: fallbackData, userCount: fallbackCount, ...tableProps } = props;

  // Load count
  const { data: userCount = 0 } = useUserCount({
    fallbackData: fallbackCount
  });

  // Load data
  const { data = [], size, setSize } = useUsers({ fallbackData });
  const users = useMemo(() => data.flat(), [data]);

  const handleIntervalChange = useCallback((interval: RowInterval) => {
    const lastPage = Math.ceil(interval.last / USER_PAGE_SIZE);

    if (lastPage > size) {
      setSize((old) => Math.max(old, lastPage));
    }
  }, [setSize, size]);
  
  // Render
  return (
    <VirtualTable
      {...tableProps}
      columnLayout={{
        xs: '1fr 1fr',
        sm: '2fr 1fr 2fr',
        md: '2fr 2fr 1fr 1fr 2fr',
      }}
      data={users}
      head={
        <VirtualRow aria-rowindex={1}>
          <VirtualCell scope="col" size="small">Name</VirtualCell>
          <VirtualCell scope="col" size="small" sx={{ display: { xs: 'none', md: 'block' } }}>Email</VirtualCell>
          <VirtualCell scope="col" size="small" sx={{ display: { xs: 'none', sm: 'block' } }}>Identities</VirtualCell>
          <VirtualCell scope="col" size="small" sx={{ display: { xs: 'none', md: 'block' } }}>Login count</VirtualCell>
          <VirtualCell scope="col" size="small">Last login</VirtualCell>
        </VirtualRow>
      }
      loadedCount={users.length}
      onIntervalChange={handleIntervalChange}
      row={userRow}
      rowCount={userCount}

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

  return <UserRow key={user.user_id} rowIndex={index} user={user} aria-rowindex={index + 2} />;
};
