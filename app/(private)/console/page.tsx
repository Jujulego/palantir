import UserCountSsr from '@/components/users/UserCountSsr';
import StatCard from '@/components/utils/StatCard';

// Page
export default async function AdminPage() {
  return (
    <>
      <h1 className="typography-h4 grow-0 shrink-0 m-6">
        Dashboard
      </h1>

      <section className="grid grid-cols-12 p-4 gap-4">
        <StatCard
          title="Users"
          href="/console/auth/users"
          sx={{ gridColumn: { '@xs': 'span 12', '@sm': 'span 6', '@md': 'span 3' } }}
        >
          <UserCountSsr />
        </StatCard>
      </section>
    </>
  );
}
