import { isAuthenticated } from '@/lib/auth/is-authenticated';

export default async function AdminPage() {
  const { user } = await isAuthenticated({ returnTo: '/admin' });

  return <h1>Hello {user.given_name ?? user.nickname}!</h1>;
}
