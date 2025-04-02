import UserCountCard from '@/components/users/UserCountCard';
import { queryUsers } from '@/lib/users/users';
import type { SxProps, Theme } from '@mui/material/styles';

// Component
export interface UserCountProps {
  readonly sx?: SxProps<Theme>;
}

export default async function UserCount({ sx }: UserCountProps) {
  const { total } = await queryUsers({ includeTotals: true, perPage: 0 });

  return <UserCountCard userCount={total} sx={sx} />;
}
