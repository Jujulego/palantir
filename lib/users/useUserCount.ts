import { actQueryUsers } from '@/lib/users/users.actions';
import useSWR from 'swr';

// Constants
const THROTTLE_INTERVAL = 30_000; // ms

// Hook
export function useUserCount({ fallbackData }: UseUserCountOpts = {}) {
  return useSWR(['users', '--count--'], userCountFetcher, {
    fallbackData,
    focusThrottleInterval: THROTTLE_INTERVAL,
    revalidateOnMount: fallbackData === undefined,
  });
}

export interface UseUserCountOpts {
  readonly fallbackData?: number;
}

// Utils
async function userCountFetcher(): Promise<number> {
  const { total } = await actQueryUsers({ includeTotals: true, perPage: 0 });
  return total;
}
