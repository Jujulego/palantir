import LocationCityIcon from '@mui/icons-material/LocationCity';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

export default function LocationItemSkeleton() {
  return (
    <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
      <ListItemIcon sx={{ minWidth: 40 }}>
        <LocationCityIcon color="primary" />
      </ListItemIcon>

      <ListItemText
        primary={<Skeleton sx={{ width: '75%' }} />}
        secondary={<Skeleton sx={{ width: '50%' }} />}
      />
    </ListItem>
  );
}