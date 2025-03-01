import type { UserDto } from '@/lib/users/user.dto';
import { actQueryUsers } from '@/lib/users/users.actions';
import useSWRInfinite from 'swr/infinite';

// Constants
const THROTTLE_INTERVAL = 30_000; // ms

export const USER_PAGE_SIZE = 25;

// Hook
export function useUsers({ fallbackData }: UseUsersOpts = {}) {
  return useSWRInfinite(userPageKey, usersFetcher, {
    fallbackData: fallbackData && [fallbackData],
    focusThrottleInterval: THROTTLE_INTERVAL,
    initialSize: fallbackData ? Math.max(1, Math.ceil(fallbackData.length / USER_PAGE_SIZE)) : 1,
    parallel: true,
    revalidateAll: true,
    revalidateOnMount: fallbackData ? fallbackData.length < USER_PAGE_SIZE : true,
  });
}

export interface UseUsersOpts {
  readonly fallbackData?: UserDto[];
}

// Utils
type UserPageKey = ['users', '--page--', number];

function userPageKey(pageIndex: number): UserPageKey {
  return ['users', '--page--', pageIndex];
}

async function usersFetcher([,, page]: UserPageKey): Promise<UserDto[]> {
  return await actQueryUsers({ page, perPage: USER_PAGE_SIZE });
}
