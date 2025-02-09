import DataObjectIcon from '@mui/icons-material/DataObject';
import HubIcon from '@mui/icons-material/Hub';
import LabelIcon from '@mui/icons-material/Label';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

export default function WithMapServerIpLoading() {
  return (
    <List>
      <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <LocationCityIcon color="primary" />
        </ListItemIcon>

        <ListItemText
          primary={<Skeleton sx={{ width: '75%' }} />}
          secondary={<Skeleton sx={{ width: '50%' }} />}
        />
      </ListItem>

      <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <HubIcon color="primary" />
        </ListItemIcon>

        <ListItemText
          primary={<Skeleton sx={{ width: '75%' }} />}
          secondary={<Skeleton sx={{ width: '50%' }} />}
        />
      </ListItem>

      <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <LabelIcon color="primary" />
        </ListItemIcon>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Skeleton variant="rectangular" height={24} width={75} sx={{ borderRadius: 9999 }} />
          <Skeleton variant="rectangular" height={24} width={50} sx={{ borderRadius: 9999 }} />
          <Skeleton variant="rectangular" height={24} width={33} sx={{ borderRadius: 9999 }} />
        </Box>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton disabled>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <DataObjectIcon color="primary" />
          </ListItemIcon>

          <ListItemText primary="View payload" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
