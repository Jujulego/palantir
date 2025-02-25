import LocationItemSkeleton from '@/components/utils/LocationItemSkeleton';
import PetsIcon from '@mui/icons-material/Pets';
import StraightenIcon from '@mui/icons-material/Straighten';
import WcIcon from '@mui/icons-material/Wc';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

export default function WithMapAnimalNameLoading() {
  return (
    <List>
      <LocationItemSkeleton />

      <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
        <ListItemIcon>
          <PetsIcon color="primary" />
        </ListItemIcon>

        <ListItemText
          primary={<Skeleton sx={{ width: '75%' }} />}
        />
      </ListItem>

      <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
        <ListItemIcon>
          <StraightenIcon color="primary" />
        </ListItemIcon>

        <ListItemText
          primary={<Skeleton sx={{ width: '75%' }} />}
        />
      </ListItem>

      <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
        <ListItemIcon>
          <WcIcon color="primary" />
        </ListItemIcon>

        <ListItemText
          primary={<Skeleton sx={{ width: '75%' }} />}
        />
      </ListItem>
    </List>
  );
}
