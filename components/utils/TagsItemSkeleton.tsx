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

      <Stack className="items-center flex-wrap gap-2" direction="row">
        <Skeleton className="rounded-full" variant="rectangular" height={24} width={75} />
        <Skeleton className="rounded-full" variant="rectangular" height={24} width={50} />
        <Skeleton className="rounded-full" variant="rectangular" height={24} width={33} />
      </Stack>
    </ListItem>
  );
}
