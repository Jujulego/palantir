import ListItem, { type ListItemBaseProps } from '@mui/material/ListItem';
import { HTMLMotionProps, m } from 'motion/react';

// Component
export interface SearchListItemProps extends ListItemBaseProps, Omit<HTMLMotionProps<'li'>, 'children' | 'style'> {
  readonly selected?: boolean;
  readonly disabled?: boolean;
}

export default function SearchListItem({ children, disabled, selected, ...props }: SearchListItemProps) {
  return (
    <ListItem
      {...props}

      component={m.li}
      sx={{ overflow: 'hidden' }}

      animate={{
        height: 48,
        paddingTop: props.disablePadding ? 0 : 8,
        paddingBottom: props.disablePadding ? 0 : 8,
      }}
      exit={outStyle}
      initial={outStyle}
      transition={{ ease: 'easeOut' }}

      aria-disabled={disabled}
      aria-selected={selected}
      role="option"
    >
      { children }
    </ListItem>
  );
}

// Utils
const outStyle = {
  height: 0, paddingTop: 0, paddingBottom: 0
};
