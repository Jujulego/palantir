import type { ReactNode } from 'react';

// Layout
export interface CodeLayoutProps {
  readonly children?: ReactNode;
}

export default async function CodeLayout({ children }: CodeLayoutProps) {
  return children;
}

export async function generateStaticParams() {
  return [];
}
