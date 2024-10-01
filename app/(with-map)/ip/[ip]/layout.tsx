import ipaddr from 'ipaddr.js';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

export interface WithMapIpLayoutProps {
  readonly children: ReactNode;
  readonly params: {
    readonly ip: string;
  };
}

export default function WithMapIpLayout({ children, params }: WithMapIpLayoutProps) {
  const ip = decodeURIComponent(params.ip);

  if (!ipaddr.isValid(ip)) {
    redirect('/');
  }

  return children;
}
