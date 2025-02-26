import type { RightKey } from '@/lib/auth/permissions';
import type { UserDto } from '@/lib/users/user.dto';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { type ReactNode, useId } from 'react';

// Component
export interface UserPermissionListItemProps {
  readonly user: UserDto;
  readonly right: RightKey;
  readonly primary: ReactNode;
  readonly secondary: ReactNode;
}

export default function UserPermissionListItem({ user, right, primary, secondary }: UserPermissionListItemProps) {
  const id = useId();

  const selected = user.app_metadata?.permissions?.includes(right) ?? false;

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox
          aria-labelledby={id}
          edge="start"

          checked={selected}
          value={right}
        />
      </ListItemIcon>
      <ListItemText id={id} primary={primary} secondary={secondary} />
    </ListItem>
  );
}
