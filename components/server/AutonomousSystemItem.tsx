import type { AutonomousSystem } from '@/lib/server/autonomous-system';
import HubIcon from '@mui/icons-material/Hub';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export interface AutonomousSystemItemProps {
  readonly autonomousSystem: AutonomousSystem;
}

export default function AutonomousSystemItem(props: AutonomousSystemItemProps) {
  const { autonomousSystem } = props;

  return (
    <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
      <ListItemIcon sx={{ minWidth: 40 }}>
        <HubIcon color="primary" />
      </ListItemIcon>

      <ListItemText
        primary={autonomousSystem.organisation}
        secondary={`AS${autonomousSystem.asn}`}
        slotProps={{
          primary: { noWrap: true },
        }}
      />
    </ListItem>
  );
}
