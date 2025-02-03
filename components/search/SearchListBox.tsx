import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import type { ReactNode, Ref } from 'react';

// Component
export interface SearchListBoxProps {
  readonly ref?: Ref<HTMLUListElement>;
  readonly isOpen: boolean;
  readonly listBoxId: string;
  readonly children?: ReactNode;
}

export default function SearchListBox({ ref, isOpen, listBoxId, children }: SearchListBoxProps) {
  return (
    <List id={listBoxId} ref={ref} role="listbox" disablePadding>
      { isOpen && (
        <>
          <EmptyOption role="option" aria-disabled="true">
            <ListItemText primary="No options" sx={{ color: 'text.disabled' }} />
          </EmptyOption>
          { children }
        </>
      ) }
    </List>
  );
}

// Elements
const EmptyOption = styled(ListItem)(({ theme }) => ({
  height: 0,
  paddingTop: 0,
  paddingBottom: 0,
  overflow: 'hidden',

  transition: theme.transitions.create('height'),

  '&:last-child': {
    height: 48,
  }
}));
