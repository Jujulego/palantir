import RightGate from '@/components/auth/RightGate';
import ConsoleDrawerLink from '@/components/console/ConsoleDrawerLink';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Toolbar from '@mui/material/Toolbar';

// Component
export interface ConsoleDrawerProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function ConsoleDrawer() {
  return (
    <Drawer
      variant="permanent"
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
        <ConsoleDrawerLink href="/console" icon={<DashboardIcon />} primary="Dashboard" exactMatch />

        <RightGate right="console:ManageUsers">
          <List
            component="div"
            subheader={
              <ListSubheader component="h6" sx={{ m: 0, lineHeight: '36px' }}>
                Authentication
              </ListSubheader>
            }
          >
            <ConsoleDrawerLink href="/console/auth/users" icon={<PeopleIcon />} primary="Users" />
          </List>
        </RightGate>
      </List>
    </Drawer>

  )
}