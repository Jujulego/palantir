'use server';

import { isAuthenticated } from '@/lib/auth/is-authenticated';
import type { UserDto, UserListDto, UserListQuery } from '@/lib/users/user.dto';
import { queryUsers } from '@/lib/users/users';

// Actions
export async function actQueryUsers(query: UserListQuery & { includeTotals: true }): Promise<UserListDto>;
export async function actQueryUsers(query?: UserListQuery & { includeTotals?: false }): Promise<UserDto[]>;
export async function actQueryUsers(query: UserListQuery = {}): Promise<UserListDto | UserDto[]> {
  await isAuthenticated();

  return await queryUsers(query);
}
