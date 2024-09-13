import StoreProvider from '@/components/StoreProvider';
import type { ReactNode } from 'react';

// Component
export interface WithMapLayoutProps {
  readonly children?: ReactNode;
}

export default function WithMapLayout({ children }: WithMapLayoutProps) {
  return <StoreProvider>{ children }</StoreProvider>;
}