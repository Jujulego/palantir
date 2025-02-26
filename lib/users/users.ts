import { auth0Fetch } from '@/lib/auth/fetch';
import { managementApiToken } from '@/lib/auth/management-api-token';
import { PatchUserDto, USER_FIELDS, type UserDto, type UserListDto, type UserListQuery } from '@/lib/users/user.dto';
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
    headers: {
      Authorization: `Bearer ${await managementApiToken()}`
    },
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
      headers: {
        Authorization: `Bearer ${await managementApiToken()}`
      },
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
  const url = new URL(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${id}`);
  url.searchParams.set('fields', USER_FIELDS.join(','));

  try {
    const result = await auth0Fetch<UserDto>(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${await managementApiToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patch),
      cache: 'no-store',
    });

    // revalidateTag('users-pages');
    // revalidateTag(`users-${id}`);
    
    return result;
  } catch (error) {
    if (error instanceof FetchError && error.status === 404) {
      return null;
    }

    throw error;
  }
}
