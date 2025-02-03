import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

// Component
export default function SearchEmptyOption() {
  return (
    <ListItem role="option" aria-disabled="true">
      <ListItemText primary="No options" sx={{ color: 'text.disabled' }} />
    </ListItem>
  );
}
