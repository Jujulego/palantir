'use client';

import Inflate from '@/components/utils/Inflate';
import { useUserCount } from '@/lib/users/useUserCount';

// Component
export interface UserCountProps {
  readonly fallbackCount: number;
}

export default function UserCount({ fallbackCount }: UserCountProps) {
  const { data: count = fallbackCount } = useUserCount({ fallbackData: fallbackCount });
  return <Inflate value={count} />;
}
