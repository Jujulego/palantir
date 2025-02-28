import type { RightKey } from '@/lib/auth/permissions';

// Constants
export const USER_FIELDS = [
  'user_id',
  'created_at',
  'updated_at',

  'app_metadata',
  'identities',
  'last_login',
  'last_ip',
  'logins_count',
  'name',
  'nickname',
  'picture',
];

// Types
export interface UserDto {
  readonly user_id: string;
  readonly created_at: string;
  readonly updated_at: string;

  readonly app_metadata?: UserAppMetadata;
  readonly identities: UserIdentity[],
  readonly last_login: string;
  readonly last_ip?: string;
  readonly logins_count: number;
  readonly name?: string;
  readonly nickname?: string;
  readonly picture?: string;
}

export interface UserAppMetadata {
  readonly permissions?: readonly RightKey[];
}

export interface UserIdentity {
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

export interface PatchUserDto extends Partial<UserDto> {
  readonly app_metadata?: Partial<UserAppMetadata>;
}
