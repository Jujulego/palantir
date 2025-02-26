// Constants
export const USER_FIELDS = ['user_id', 'name', 'nickname', 'picture', 'identities', 'last_login', 'app_metadata'];

// Types
export interface UserDto {
  readonly name?: string;
  readonly nickname?: string;
  readonly identities: UserIdentity[],
  readonly user_id: string;
  readonly picture?: string;
  readonly last_login: string;
  readonly app_metadata?: UserAppMetadata;
}

export interface UserAppMetadata {
  readonly permissions?: readonly string[];
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
