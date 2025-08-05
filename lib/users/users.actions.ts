'use server';

import { needRight } from '@/lib/auth/need-right';
import type {
  LinkAccountDto,
  PatchUserDto,
  UserDto,
  UserIdentity,
  UserListDto,
  UserListQuery
} from '@/lib/users/user.dto';
import { linkAccount, patchUser, queryUsers } from '@/lib/users/users';
import { notFound } from 'next/navigation';

// Actions
export async function actQueryUsers(query: UserListQuery & { includeTotals: true }): Promise<UserListDto>;
export async function actQueryUsers(query?: UserListQuery & { includeTotals?: false }): Promise<UserDto[]>;
export async function actQueryUsers(query: UserListQuery = {}): Promise<UserListDto | UserDto[]> {
  await needRight('console:ManageUsers');

  return await queryUsers(query);
}

export async function actPatchUser(id: string, data: PatchUserDto): Promise<UserDto> {
  await needRight('console:ManageUsers');

  const result = await patchUser(id, data);

  if (!result) {
    notFound();
  }

  return result;
}

export async function actLinkAccount(id: string, data: LinkAccountDto): Promise<UserIdentity[]> {
  await needRight('console:ManageUsers');

  return await linkAccount(id, data);
}
