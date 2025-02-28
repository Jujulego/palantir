'use client';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { ReactNode } from 'react';

// Component
export interface UserLayoutTabsProps {
  readonly userId: string;
}

export default function UserLayoutTabs({ userId }: UserLayoutTabsProps) {
  const segment = useSelectedLayoutSegment();
  const userUrl = `/console/auth/users/${userId}`;

  return (
    <Tabs component="nav" value={segment}>
      <LinkTab baseUrl={userUrl} label="Details" value={null} />
      <LinkTab baseUrl={userUrl} label="Permissions" value="permissions" />
    </Tabs>
  );
}

// Elements
interface LinkTabProps {
  readonly label: ReactNode;
  readonly baseUrl: string;
  readonly value: string | null;
  readonly selected?: boolean;
}

function LinkTab({ baseUrl, ...props }: LinkTabProps) {
  return (
    <Tab
      component={Link}
      {...props}
      href={props.value ? `${baseUrl}/${props.value}` : baseUrl}
      aria-current={props.selected && 'page'}
    />
  );
}