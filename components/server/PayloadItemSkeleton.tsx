import DataObjectIcon from '@mui/icons-material/DataObject';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function PayloadItemSkeleton() {
  return (
    <ListItem disablePadding>
      <ListItemButton disabled>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <DataObjectIcon color="primary" />
        </ListItemIcon>

        <ListItemText primary="View payload" />
      </ListItemButton>
    </ListItem>
  );
}