'use client';

import type { RightKey } from '@/lib/auth/permissions';
import { actSessionRights } from '@/lib/auth/rights.actions';
import type { ReactNode } from 'react';
import useSWR from 'swr';

export interface RightGateProps {
  readonly children: ReactNode;
  readonly right: RightKey;

  readonly allowedByDefault?: boolean;
  readonly fallback?: ReactNode;
}

export default function RightGate({ allowedByDefault, children, fallback = null, right }: RightGateProps) {
  const { data } = useSWR(['rights'], actSessionRights);

  if ((allowedByDefault && !data) || data?.includes(right)) {
    return children;
  } else {
    return fallback;
  }
}