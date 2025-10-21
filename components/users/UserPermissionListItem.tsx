'use client';

import type { RightKey } from '@/lib/auth/permissions';
import type { PatchUserDto, UserDto } from '@/lib/users/user.dto';
import CheckIcon from '@mui/icons-material/Check';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { type ChangeEvent, type ReactNode, useCallback, useId, useState, useTransition } from 'react';

// Component
export interface UserPermissionListItemProps {
  readonly user: UserDto;
  readonly right: RightKey;
  readonly onPatchAction: (id: string, patch: PatchUserDto) => Promise<UserDto>;
  readonly primary: ReactNode;
  readonly secondary: ReactNode;
}

export default function UserPermissionListItem({ user, right, onPatchAction, primary, secondary }: UserPermissionListItemProps) {
  const id = useId();

  // Action state
  const [pristine, setPristine] = useState(true);
  const [isPending, startChange] = useTransition();
  
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    let permissions = user.app_metadata?.permissions ?? [];
    setPristine(false);

    if (event.target.checked) {
      permissions = [...permissions, right];
    } else {
      permissions = permissions.filter((key) => key !== right);
    }

    startChange(async () => {
      await onPatchAction(user.user_id, { app_metadata: { permissions } });
    });
  }, [onPatchAction, right, user.app_metadata?.permissions, user.user_id]);

  // Checkbox state
  const selected = user.app_metadata?.permissions?.includes(right) ?? false;

  // Render
  return (
    <ListItem
      secondaryAction={
        isPending
          ? <CircularProgress size={24} />
          : !pristine ? <CheckIcon color="success" /> : null
      }
    >
      <ListItemIcon>
        <Checkbox
          aria-labelledby={id}
          edge="start"

          checked={selected}
          onChange={handleChange}
          value={right}
        />
      </ListItemIcon>
      <ListItemText id={id} primary={primary} secondary={secondary} />
    </ListItem>
  );
}
