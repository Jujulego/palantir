import UserCountCard from '@/components/users/UserCountCard';
import { queryUsers } from '@/lib/users/users';

export default async function UserCount() {
  const { total } = await queryUsers({ includeTotals: true, perPage: 0 });

  return <UserCountCard userCount={total} />;
}
