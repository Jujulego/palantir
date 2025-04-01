import RightGate from '@/components/auth/RightGate';
import ConsoleDrawerLink from '@/components/console/ConsoleDrawerLink';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { useTheme } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect } from 'react';

// Component
export interface ConsoleDrawerProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function ConsoleDrawer({ isOpen, onClose }: ConsoleDrawerProps) {
  const theme = useTheme();

  // State
  const isTemporary = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (!isTemporary) onClose();
  }, [isTemporary, onClose]);

  // Render
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      variant={isTemporary ? 'temporary' : 'permanent'}
      sx={{
        flex: '0 0 auto',
        width: 320,

        '& .MuiDrawer-paper': {
          width: 320,
        }
      }}
    >
      <Toolbar />

      <List component="nav">
        <ConsoleDrawerLink href="/console" icon={<DashboardIcon />} primary="Dashboard" exactMatch onClick={onClose} />

        <RightGate right="console:ManageUsers">
          <List
            component="div"
            subheader={
              <ListSubheader component="h6" disableSticky sx={{ m: 0, lineHeight: '36px' }}>
                Authentication
              </ListSubheader>
            }
          >
            <ConsoleDrawerLink href="/console/auth/users" icon={<PeopleIcon />} primary="Users" onClick={onClose} />
          </List>
        </RightGate>
      </List>
    </Drawer>
  );
}