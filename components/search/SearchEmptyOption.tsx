import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { m } from 'motion/react';

// Component
export default function SearchEmptyOption() {
  return (
    <ListItem
      component={m.li}
      sx={{ overflow: 'hidden' }}

      initial={{ height: 0, paddingTop: 0, paddingBottom: 0 }}
      animate={{ height: 48, paddingTop: 8, paddingBottom: 8 }}
      exit={{ height: 0, paddingTop: 0, paddingBottom: 0 }}
      transition={{ ease: 'easeOut' }}

      aria-disabled="true"
      role="option"
    >
      <ListItemText primary="No options" sx={{ color: 'text.disabled' }} />
    </ListItem>
  );
}
