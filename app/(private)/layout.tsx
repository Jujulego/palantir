import AuthProvider from '@/components/auth/AuthProvider';
import { querySessionRights } from '@/lib/auth/need-right';
import type { ReactNode } from 'react';

// Layout
export interface PrivateLayoutProps {
  readonly children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <AuthProvider sessionRights={await querySessionRights()}>
      { children }
    </AuthProvider>
  );
}