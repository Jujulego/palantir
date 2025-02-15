import HubIcon from '@mui/icons-material/Hub';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

export default function AutonomousSystemItemSkeleton() {
  return (
    <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
      <ListItemIcon sx={{ minWidth: 40 }}>
        <HubIcon color="primary" />
      </ListItemIcon>

      <ListItemText
        primary={<Skeleton sx={{ width: '75%' }} />}
        secondary={<Skeleton sx={{ width: '50%' }} />}
      />
    </ListItem>
  );
}