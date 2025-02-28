import UserAvatar from '@/components/users/UserAvatar';
import type { UserDto } from '@/lib/users/user.dto';
import { actLinkAccount } from '@/lib/users/users.actions';
import { useUsers } from '@/lib/users/useUsers';
import LinkIcon from '@mui/icons-material/Link';
import { DialogActions, ListItemAvatar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { collect$, filter$, flat$, pipe$ } from 'kyrielle';
import { useCallback, useMemo, useState } from 'react';

// Component
export interface LinkAccountDialogProps {
  readonly userId: string;
  readonly open: boolean;
  readonly onClose: () => void;
}

export default function LinkAccountDialog({ userId, open, onClose }: LinkAccountDialogProps) {
  // Load users
  const { data = [] } = useUsers();
  const users = useMemo(() => pipe$(
    data,
    flat$(),
    filter$((user) => user.user_id !== userId),
    collect$()
  ), [data, userId]);

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
      
      onClose();
    } finally {
      setIsLinking(false);
    }
  }, [onClose, selected, userId]);
  
  // Render
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth scroll="paper">
      <DialogTitle>Account linking</DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        <List disablePadding>
          { users.map((user) => (
            <ListItem key={user.user_id} disablePadding>
              <ListItemButton
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
            </ListItem>
          ))}
        </List>
      </DialogContent>
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
