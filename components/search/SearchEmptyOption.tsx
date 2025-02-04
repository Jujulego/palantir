import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

// Component
export default function SearchEmptyOption() {
  return (
    <ListItem aria-disabled="true" role="option">
      <ListItemText primary="No options" sx={{ color: 'text.disabled' }} />
    </ListItem>
  );
}
