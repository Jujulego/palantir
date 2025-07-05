'use client';

import type { RightKey } from '@/lib/auth/permissions';
import type { ReactNode } from 'react';
import { SWRConfig, unstable_serialize } from 'swr';

// Component
export interface ProvideAuthProps {
  readonly children: ReactNode;
  readonly sessionRights: readonly RightKey[];
}

export default function AuthProvider({ children, sessionRights }: ProvideAuthProps) {
  return (
    <SWRConfig value={{
      fallback: {
        [unstable_serialize(['session-rights'])]: sessionRights,
      }
    }}>
      { children }
    </SWRConfig>
  );
}
