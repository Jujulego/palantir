import { actSessionRights } from '@/lib/auth/rights.actions';
import useSWR from 'swr';

// Hook
export function useSessionRights() {
  const { data = [] } = useSWR(['session-rights'], actSessionRights);
  return data;
}
