'use client';

import RadarIcon from '@mui/icons-material/Radar';
import { Card, CardActionArea, Collapse, Divider, SxProps } from '@mui/material';
import { ReactNode, useCallback, useContext, useState } from 'react';

import { MapboxFocus } from '@/src/mapbox/MapboxFocus.context';

// Component
export interface DataCardProps {
  readonly focusKey: string;
  readonly header: ReactNode;
  readonly children: ReactNode;
  readonly sx?: SxProps;
}

export default function DataCard({ focusKey, header, children, sx }: DataCardProps) {
  const { focus, setFocus } = useContext(MapboxFocus);
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    if (focus === focusKey || !open) {
      setOpen((old) => !old);
    } 
    
    if (focus !== focusKey) {
      setFocus(focusKey);
    }
  }, [open, focus, focusKey, setFocus]);

  return (
    <Card sx={sx}>
      <CardActionArea onClick={handleClick} sx={{ position: 'relative' }}>
        { (focus === focusKey) && (
          <RadarIcon sx={{ position: 'absolute', top: -24, right: -12, fontSize: 88, color: 'action.selected' }} />
        ) }
        { header }
      </CardActionArea>

      <Collapse in={open}>
        <Divider />

        { children }
      </Collapse>
    </Card>
  );
}
