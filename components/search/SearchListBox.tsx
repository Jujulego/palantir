import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

// Component
export interface SearchListBoxProps {
  readonly isOpen: boolean;
  readonly listBoxId: string;
  readonly children?: ReactNode;
}

export default function SearchListBox({ isOpen, listBoxId, children }: SearchListBoxProps) {
  return (
    <Collapse in={isOpen} unmountOnExit>
      <List id={listBoxId} role="listbox" disablePadding>
        <EmptyOption>
          <ListItemText primary="No options" sx={{ color: 'text.disabled' }} />
        </EmptyOption>

        { children }
      </List>
    </Collapse>
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
