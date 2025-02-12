import type { Tag } from '@/lib/utils/tag';
import LabelIcon from '@mui/icons-material/Label';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';

// Component
export interface TagsListItemProps {
  readonly tags: readonly Tag[];
}

export function TagsListItem({ tags }: TagsListItemProps) {
  return (
    <ListItem disablePadding sx={{ minHeight: 56, px: 2 }}>
      <ListItemIcon sx={{ minWidth: 40 }}>
        <LabelIcon color="primary" />
      </ListItemIcon>

      <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', p: 0, gap: 1 }}>
        { tags.map((tag) => (
          <Chip key={tag.label} component="li" label={tag.label} size="small" color={tag.color} />
        )) }
      </Box>
    </ListItem>
  );
}
