'use client';

import UserAvatar from '@/components/users/UserAvatar';
import VirtualItem from '@/components/virtual/VirtualItem';
import VirtualList, { type ItemFn } from '@/components/virtual/VirtualList';
import type { RowInterval } from '@/components/virtual/VirtualTable';
import type { UserDto } from '@/lib/users/user.dto';
import { actLinkAccount } from '@/lib/users/users.actions';
import { useUserCount } from '@/lib/users/useUserCount';
import { USER_PAGE_SIZE, useUsers } from '@/lib/users/useUsers';
import LinkIcon from '@mui/icons-material/Link';
import { DialogActions, ListItemAvatar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

// Component
export interface LinkAccountDialogProps {
  readonly userId: string;
  readonly open: boolean;
  readonly onClose: () => void;
}

export default function LinkAccountDialog({ userId, open, onClose }: LinkAccountDialogProps) {
  const router = useRouter();

  // Load user count
  const { data: userCount = 0 } = useUserCount();

  // Load users
  const { data = [], size, setSize } = useUsers();
  const users = useMemo(() => data.flat(), [data]);

  const handleIntervalChange = useCallback((interval: RowInterval) => {
    const lastPage = Math.ceil(interval.last / USER_PAGE_SIZE);

    if (lastPage > size) {
      setSize((old) => Math.max(old, lastPage));
    }
  }, [setSize, size]);

  // Selection
  const [selected, setSelected] = useState<UserDto | null>(null);
  
  // Action state
  const [isLinking, setIsLinking] = useState(false);

  const handleClose = useCallback(() => {
    if (!isLinking) onClose();
  }, [isLinking, onClose]);

  const handleLink = useCallback(async () => {
    if (!selected) return;

    try {
      setIsLinking(true);
      await actLinkAccount(userId, {
        user_id: selected.user_id,
        provider: selected.identities[0].provider,
      });

      router.refresh();
      onClose();
    } finally {
      setIsLinking(false);
    }
  }, [onClose, router, selected, userId]);
  
  // Render
  const userItem: ItemFn<UserDto[]> = useCallback(({ index, data: users }) => {
    const user = users[index];

    if (!user) {
      return (
        <VirtualItem
          key={index}
          aria-setsize={userCount}
          aria-posinset={index + 1}
          rowIndex={index}
        >
          <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton width="50%" />}
            secondary={<Skeleton width="75%" />}
          />
        </VirtualItem>
      );
    }

    return (
      <VirtualItem
        key={user.user_id}
        aria-setsize={userCount}
        aria-posinset={index + 1}
        rowIndex={index}
        disablePadding
      >
        <ListItemButton
          disabled={user.user_id === userId}
          selected={user.user_id === selected?.user_id}
          onClick={() => setSelected(user)}
        >
          <ListItemAvatar>
            <UserAvatar user={user} />
          </ListItemAvatar>
          <ListItemText
            primary={user.nickname ?? user.name}
            secondary={user.email}
          />
        </ListItemButton>
      </VirtualItem>
    );
  }, [selected?.user_id, userCount, userId]);
  
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Account linking</DialogTitle>
      <VirtualList
        className="grow shrink basis-auto overflow-auto border-y border-divider"
        disablePadding
        data={users}
        item={userItem}
        itemCount={userCount}
        itemSize={72}
        loadedCount={users.length}
        onIntervalChange={handleIntervalChange}
        sx={(theme) => ({
          flex: '1 1 auto',
          overflow: 'auto',

          borderTop: `1px solid ${theme.vars.palette.divider}`,
          borderBottom: `1px solid ${theme.vars.palette.divider}`,
        })}
      />
      <DialogActions>
        <Button disabled={isLinking} onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          startIcon={<LinkIcon />}
          disabled={!selected}
          loading={isLinking}
          loadingPosition="start"
          onClick={handleLink}
        >
          Link
        </Button>
      </DialogActions>
    </Dialog>
  );
}
