'use client';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

// Component
export interface UserLayoutTabsProps {
  readonly userId: string;
}

export default function UserLayoutTabs({ userId }: UserLayoutTabsProps) {
  const segment = useSelectedLayoutSegment();
  const userUrl = `/console/auth/users/${userId}`;

  return (
    <Tabs component="nav" value={segment}>
      <Tab component={Link} href={userUrl} label="Details" value={null} />
      <Tab
        component={Link}
        href={`${userUrl}/permissions`}
        label="Permissions"
        value="permissions"
        disabled
      />
    </Tabs>
  );
}
