'use server';

import { querySessionRights } from '@/lib/auth/need-right';
import type { RightKey } from '@/lib/auth/permissions';

export async function actSessionRights(): Promise<readonly RightKey[]> {
  return await querySessionRights();
}