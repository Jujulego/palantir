import { auth0Fetch } from '@/lib/auth/fetch';
import { managementApiToken } from '@/lib/auth/management-api-token';

// Api calls
export async function queryUsers(query: UserListQuery & { includeTotals: true }): Promise<UserListDto>;
export async function queryUsers(query?: UserListQuery & { includeTotals?: false }): Promise<UserDto[]>;
export async function queryUsers(query?: UserListQuery): Promise<UserListDto | UserDto[]>;
export async function queryUsers(query: UserListQuery = {}): Promise<UserListDto | UserDto[]> {
  console.log('[auth0] Load users');
  const url = new URL(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`);
  url.searchParams.set('fields', 'user_id,name,nickname,picture,identities,last_login,app_metadata');
  url.searchParams.set('include_totals', query.includeTotals ? 'true' : 'false');

  if (query.page !== undefined) {
    url.searchParams.set('page', query.page.toString());
  }

  if (query.perPage !== undefined) {
    url.searchParams.set('per_page', query.perPage.toString());
  }

  return await auth0Fetch<UserListDto>(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${await managementApiToken()}`
    },
    next: {
      revalidate: 60,
      tags: ['users']
    }
  });
}

// Types
export interface UserDto {
  readonly name: string;
  readonly nickname: string;
  readonly identities: UserIdentityDto[],
  readonly user_id: string;
  readonly picture: string;
  readonly last_login: string;
  readonly app_metadata: Record<string, unknown>;
}

export interface UserIdentityDto {
  readonly connection: string;
  readonly user_id: string;
  readonly provider: string;
  readonly isSocial: boolean;
}

export interface UserListDto {
  readonly start: number;
  readonly limit: number;
  readonly length: number;
  readonly total: number;
  readonly users: UserDto[];
}

export interface UserListQuery {
  readonly includeTotals?: boolean;
  readonly page?: number;
  readonly perPage?: number;
}
