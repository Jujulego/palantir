'use client';

import VirtualCell from '@/components/table/VirtualCell';
import VirtualRow from '@/components/table/VirtualRow';
import VirtualTable, { type RowFn, type RowInterval } from '@/components/table/VirtualTable';
import UserRow from '@/components/users/UserRow';
import UserRowSkeleton from '@/components/users/UserRowSkeleton';
import type { UserDto } from '@/lib/users/user.dto';
import { actQueryUsers } from '@/lib/users/users.actions';
import type { SxProps, Theme } from '@mui/material/styles';
import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

// Constants
const PAGE_SIZE = 25;

// Component
export interface UsersTableProps {
  readonly users: UserDto[];
  readonly userCount: number;
  readonly sx?: SxProps<Theme>;
}

export default function UserTable({ users: _users, userCount, sx }: UsersTableProps) {
  // Load data
  const { data = [], size, setSize } = useSWRInfinite(userPageKey, usersFetcher, {
    fallbackData: [_users],
    focusThrottleInterval: 30_000,
    initialSize: Math.ceil(_users.length / PAGE_SIZE),
    parallel: true,
    revalidateAll: true,
    revalidateOnMount: _users.length < PAGE_SIZE,
  });

  const users = useMemo(() => data.flat(), [data]);

  const handleRowIntervalChange = useCallback((interval: RowInterval) => {
    const lastPage = Math.ceil(interval.last / PAGE_SIZE);

    if (lastPage > size) {
      setSize((old) => Math.max(old, lastPage));
    }
  }, [setSize, size]);
  
  // Render
  return (
    <VirtualTable
      columnLayout="1fr 1fr 1fr 1fr"
      data={users}
      head={
        <VirtualRow aria-rowindex={1}>
          <VirtualCell scope="col" size="small">Name</VirtualCell>
          <VirtualCell scope="col" size="small">Identities</VirtualCell>
          <VirtualCell scope="col" size="small">Login count</VirtualCell>
          <VirtualCell scope="col" size="small">Last login</VirtualCell>
        </VirtualRow>
      }
      loadedCount={users.length}
      onRowIntervalChange={handleRowIntervalChange}
      row={userRow}
      rowCount={userCount}
      sx={sx}

      aria-rowcount={userCount + 1}
    />
  );
}

// Utils
type UserPageKey = ['users', '--page--', number];

function userPageKey(pageIndex: number): UserPageKey {
  return ['users', '--page--', pageIndex];
}

async function usersFetcher([,, page]: UserPageKey): Promise<UserDto[]> {
  return await actQueryUsers({ page, perPage: PAGE_SIZE });
}

const userRow: RowFn<UserDto[]> = ({ index, data: users }) => {
  const user = users[index];

  if (!user) {
    return <UserRowSkeleton key={index} rowIndex={index} aria-rowindex={index + 2} />;
  }

  return <UserRow key={index} rowIndex={index} user={user} aria-rowindex={index + 2} />;
};
