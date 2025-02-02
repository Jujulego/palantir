import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
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
        { children }
      </List>
    </Collapse>
  );
}
