import ListItem, { type ListItemProps } from '@mui/material/ListItem';

// Component
export interface SearchListItemProps extends ListItemProps {
  readonly selected?: boolean;
  readonly disabled?: boolean;
}

export default function SearchListItem({ children, disabled, selected, ...props }: SearchListItemProps) {
  return (
    <ListItem
      {...props}
      role="option"
      aria-disabled={disabled}
      aria-selected={selected}
      sx={{ height: 48 }}
    >
      { children }
    </ListItem>
  );
}
