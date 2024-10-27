'use client';

import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Popover from '@mui/material/Popover';
import { type ReactNode, useCallback, useRef, useState } from 'react';

export interface MergedMenuProps {
  readonly content: ReactNode;
  readonly children: ReactNode;
}

export function MergedMenu({ content, children }: MergedMenuProps) {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  // Anchor
  const anchorRef = useRef<HTMLLIElement>(null);
  const anchorPosition = { top: 0, left: 0 };

  if (anchorRef.current) {
    const { top, right } = anchorRef.current.getBoundingClientRect();

    anchorPosition.top = top - 8;
    anchorPosition.left = right;
  }

  // Render
  return (
    <ListItem ref={anchorRef} disablePadding>
      <ListItemButton
        onClick={handleOpen}
        sx={{ minHeight: 56, px: 2, py: 0 }}
      >
        { content }

        <ExpandCircleDownIcon
          sx={{
            transform: isOpen ? 'rotate(90deg)' : 'rotate(-90deg)',
            transition: ({ transitions }) => transitions.create('transform')
        }}
        />
      </ListItemButton>

      <Popover
        open={isOpen}
        anchorPosition={anchorPosition}
        anchorReference="anchorPosition"
        slotProps={{
          paper: {
            sx: {
              minWidth: 220,
              overflow: 'auto',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }
          }
        }}
        onClose={handleClose}
      >
        <List component="nav" dense>
          { children }
        </List>
      </Popover>
    </ListItem>
  );
}