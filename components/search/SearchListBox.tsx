import Collapse from '@mui/material/Collapse';
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
      <ul id={listBoxId} role="listbox">
        { children }
      </ul>
    </Collapse>
  );
}
