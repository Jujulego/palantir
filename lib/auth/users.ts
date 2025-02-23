import { managementApiToken } from '@/lib/auth/management-api-token';
import { jsonFetch } from '@/lib/utils/fetch';

// Api calls
export async function queryUsers(): Promise<UserDto[]> {
  console.log('[auth0] Load users');
  const url = new URL(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`);
  url.searchParams.set('fields', 'user_id,name,nickname,picture,identities,last_login,app_metadata');

  return await jsonFetch<UserDto[]>(url, {
    headers: {
      Authorization: `Bearer ${await managementApiToken()}`
    },
    next: {
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