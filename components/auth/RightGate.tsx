'use client';

import { useSessionRights } from '@/components/auth/session-rights.context';
import type { RightKey } from '@/lib/auth/permissions';
import type { ReactNode } from 'react';

// Component
export interface RightGateProps {
  readonly children: ReactNode;
  readonly right: RightKey;

  readonly fallback?: ReactNode;
}

export default function RightGate({ children, fallback = null, right }: RightGateProps) {
  const rights = useSessionRights();

  if (rights.includes(right)) {
    return children;
  } else {
    return fallback;
  }
}