import UserCount from '@/components/users/UserCount';
import { queryUsers } from '@/lib/users/users';

// Component
export default async function UserCountSsr() {
  const { total } = await queryUsers({ includeTotals: true, perPage: 0 });
  return <UserCount fallbackCount={total} />;
}
