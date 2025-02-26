'use server';

import { isAuthenticated } from '@/lib/auth/is-authenticated';
import type { PatchUserDto, UserDto, UserListDto, UserListQuery } from '@/lib/users/user.dto';
import { patchUser, queryUsers } from '@/lib/users/users';
import { notFound } from 'next/navigation';

// Actions
export async function actQueryUsers(query: UserListQuery & { includeTotals: true }): Promise<UserListDto>;
export async function actQueryUsers(query?: UserListQuery & { includeTotals?: false }): Promise<UserDto[]>;
export async function actQueryUsers(query: UserListQuery = {}): Promise<UserListDto | UserDto[]> {
  await isAuthenticated();

  return await queryUsers(query);
}

export async function actPatchUser(id: string, data: PatchUserDto): Promise<UserDto> {
  await isAuthenticated();

  const result = await patchUser(id, data);

  if (!result) {
    notFound();
  }

  return result;
}
