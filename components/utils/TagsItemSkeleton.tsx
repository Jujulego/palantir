import LabelIcon from '@mui/icons-material/Label';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function TagsItemSkeleton() {
  return (
    <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
      <ListItemIcon>
        <LabelIcon color="primary" />
      </ListItemIcon>

      <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
        <Skeleton variant="rectangular" height={24} width={75} sx={{ borderRadius: 9999 }} />
        <Skeleton variant="rectangular" height={24} width={50} sx={{ borderRadius: 9999 }} />
        <Skeleton variant="rectangular" height={24} width={33} sx={{ borderRadius: 9999 }} />
      </Stack>
    </ListItem>
  );
}
