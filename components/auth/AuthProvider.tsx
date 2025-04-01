'use client';

import { SessionRightsContext } from '@/components/auth/session-rights.context';
import type { RightKey } from '@/lib/auth/permissions';
import type { ReactNode } from 'react';

// Component
export interface ProvideAuthProps {
  readonly children: ReactNode;
  readonly sessionRights: readonly RightKey[];
}

export default function AuthProvider({ children, sessionRights }: ProvideAuthProps) {
  return (
    <SessionRightsContext value={sessionRights}>
      { children }
    </SessionRightsContext>
  );
}