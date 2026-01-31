import { auth0Fetch } from '@/lib/auth/fetch';
import {
  type LinkAccountDto,
  PatchUserDto,
  USER_FIELDS,
  type UserDto, type UserIdentity,
  type UserListDto,
  type UserListQuery
} from '@/lib/users/user.dto';
import { revalidateTag } from 'next/cache';
import { FetchError } from '../utils/fetch';

// Constants
const USER_CACHE_TIMEOUT = 60; // s

// Api calls
export async function queryUsers(query: UserListQuery & { includeTotals: true }): Promise<UserListDto>;
export async function queryUsers(query?: UserListQuery & { includeTotals?: false }): Promise<UserDto[]>;
export async function queryUsers(query?: UserListQuery): Promise<UserListDto | UserDto[]>;
export async function queryUsers(query: UserListQuery = {}): Promise<UserListDto | UserDto[]> {
  console.log('[auth0] Load users');
  const url = new URL(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`);
  url.searchParams.set('fields', USER_FIELDS.join(','));
  url.searchParams.set('include_totals', query.includeTotals ? 'true' : 'false');

  if (query.page !== undefined) {
    url.searchParams.set('page', query.page.toString());
  }

  if (query.perPage !== undefined) {
    url.searchParams.set('per_page', query.perPage.toString());
  }

  return await auth0Fetch(url, {
    method: 'GET',
    next: {
      revalidate: USER_CACHE_TIMEOUT,
      tags: ['users', 'users-pages']
    }
  });
}

export async function queryUser(id: string): Promise<UserDto | null> {
  console.log(`[auth0] Load user "${id}"`);
  const url = new URL(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${id}`);
  url.searchParams.set('fields', USER_FIELDS.join(','));

  try {
    return await auth0Fetch<UserDto>(url, {
      method: 'GET',
      next: {
        revalidate: USER_CACHE_TIMEOUT,
        tags: ['users', `users-${id}`]
      }
    });
  } catch (error) {
    if (error instanceof FetchError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function patchUser(id: string, patch: PatchUserDto): Promise<UserDto | null> {
  console.log(`[auth0] Patch user "${id}"`);
  const url = new URL(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(id)}`);
  url.searchParams.set('fields', USER_FIELDS.join(','));

  try {
    const result = await auth0Fetch<UserDto>(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patch),
      cache: 'no-store',
    });

    revalidateTag('users-pages', 'max');
    revalidateTag(`users-${id}`, 'max');

    return result;
  } catch (error) {
    if (error instanceof FetchError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function linkAccount(id: string, payload: LinkAccountDto): Promise<UserIdentity[]> {
  console.log(`[auth0] Link user "${id}" to account "${payload.user_id}"`);
  const url = new URL(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(id)}/identities`);
  url.searchParams.set('fields', USER_FIELDS.join(','));

  try {
    const result = await auth0Fetch<UserIdentity[]>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    revalidateTag('users-pages', 'max');
    revalidateTag(`users-${id}`, 'max');
    revalidateTag(`users-${payload.user_id}`, 'max');

    return result;
  } catch (error) {
    throw error;
  }
}
