import RightGate from '@/components/auth/RightGate';
import ConsoleDrawerLink from '@/components/console/ConsoleDrawerLink';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Toolbar from '@mui/material/Toolbar';

// Constants
const DRAWER_WIDTH = 320;

// Component
export interface ConsoleDrawerProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export default function ConsoleDrawer({ open, onClose }: ConsoleDrawerProps) {
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          flex: '0 0 auto',
          width: DRAWER_WIDTH,

          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          }
        }}
      >
        <DrawerContent />
      </Drawer>

      <Drawer
        open={open}
        onClose={onClose}
        variant="temporary"
        sx={{
          display: { lg: 'block' },

          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          }
        }}
        slotProps={{
          root: {
            keepMounted: true,
          },
        }}
      >
        <DrawerContent />
      </Drawer>
    </>
  );
}

// Utils
interface DrawerContentProps {
  readonly onClose?: () => void;
}

function DrawerContent({ onClose }: DrawerContentProps) {
  return (
    <>
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
    </>
  );
}