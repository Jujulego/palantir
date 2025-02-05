import SearchListItem from '@/components/search/SearchListItem';
import ListItemText from '@mui/material/ListItemText';

// Component
export default function SearchEmptyOption() {
  return (
    <SearchListItem disabled>
      <ListItemText primary="No options" sx={{ color: 'text.disabled' }} />
    </SearchListItem>
  );
}
