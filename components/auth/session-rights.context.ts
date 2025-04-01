import type { RightKey } from '@/lib/auth/permissions';
import { actSessionRights } from '@/lib/auth/rights.actions';
import { createContext, use } from 'react';
import useSWR from 'swr';

// Context
export const SessionRightsContext = createContext<readonly RightKey[]>([]);

// Hook
export function useSessionRights() {
  const fallback = use(SessionRightsContext);
  const { data } = useSWR(['rights'], actSessionRights, { fallback });

  return data ?? fallback;
}