import AuthProvider from '@/components/auth/AuthProvider';
import { querySessionRights } from '@/lib/auth/need-right';

// Layout
export default async function PrivateLayout({ children }: LayoutProps<'/'>) {
  return (
    <AuthProvider sessionRights={await querySessionRights()}>
      { children }
    </AuthProvider>
  );
}
