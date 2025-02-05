import List from '@mui/material/List';
import type { ReactNode, Ref } from 'react';

// Component
export interface SearchListBoxProps {
  readonly ref?: Ref<HTMLUListElement>;
  readonly listBoxId: string;
  readonly children?: ReactNode;
}

export default function SearchListBox({ ref, listBoxId, children }: SearchListBoxProps) {
  return (
    <List id={listBoxId} ref={ref} role="listbox" disablePadding>
      { children }
    </List>
  );
}
