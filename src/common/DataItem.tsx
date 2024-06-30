import { ListItem, ListItemText, Typography } from '@mui/material';
import type { ReactNode } from 'react';

// Component
export interface CardListItemProps {
  readonly name: string;
  readonly children: ReactNode;
}

export default function DataItem({ name, children }: CardListItemProps) {
  return (
    <ListItem>
      <Typography variant="subtitle2" sx={{ width: 108, flex: '0 0 auto' }}>{ name }</Typography>
      <ListItemText primaryTypographyProps={{ noWrap: true }}>{ children }</ListItemText>
    </ListItem>
  );
}