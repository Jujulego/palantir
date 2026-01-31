import List from '@mui/material/List';
import type { ReactNode, Ref } from 'react';
import { m } from 'motion/react';

// Component
export interface SearchListBoxProps {
  readonly ref?: Ref<HTMLUListElement>;
  readonly listBoxId: string;
  readonly optionCount: number;
  readonly children?: ReactNode;
}

export default function SearchListBox({ ref, listBoxId, optionCount, children }: SearchListBoxProps) {
  const height = Math.min(optionCount * 48, 226);

  return (
    <List
      ref={ref}
      id={listBoxId}
      component={m.ul}

      disablePadding
      sx={{ overflowY: 'auto' }}
      animate={{ height }}

      aria-label="Search"
      role="listbox"
    >
      { children }
    </List>
  );
}
