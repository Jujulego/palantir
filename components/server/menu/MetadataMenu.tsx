'use client';

import { MetadataMenuContext } from '@/components/server/menu/metadata-menu.context';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ButtonBase from '@mui/material/ButtonBase';
import Fade from '@mui/material/Fade';
import LinearProgress from '@mui/material/LinearProgress';
import Menu from '@mui/material/Menu';
import Skeleton from '@mui/material/Skeleton';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import { type ReactNode, useCallback, useId, useRef, useState, useTransition } from 'react';

export interface MetadataMenuProps {
  readonly children: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function MetadataMenu({ children, sx }: MetadataMenuProps) {
  const id = useId();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [isLoading, startLoading] = useTransition();

  // Open state
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  // Selected option
  const [selectedNode, setSelectedNode] = useState<ReactNode>(null);

  // Render
  return (
    <>
      <Fade in={isLoading}>
        <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }} />
      </Fade>

      <TriggerButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={sx}

        aria-controls={`${id}-menu`}
        aria-expanded={open}
        aria-label="metadata source menu"
        aria-haspopup="true"
      >
        { selectedNode ?? <Skeleton variant="rounded" height={20} width={80} /> }
        <ExpandMoreIcon fontSize="small" />
      </TriggerButton>

      <Menu
        id={`${id}-menu`}
        open={open}
        onClick={handleClose}
        onClose={handleClose}

        anchorEl={anchorRef.current}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}

        slotProps={{
          list: {
            'aria-label': 'metadata source menu'
          }
        }}
      >
        <MetadataMenuContext value={{ setSelectedNode, startLoading }}>
          { children }
        </MetadataMenuContext>
      </Menu>
    </>
  );
}

// Elements
const TriggerButton = styled(ButtonBase)(({ theme }) => ({
  height: 24,

  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),

  paddingLeft: theme.spacing(0.5),
  paddingRight: theme.spacing(0.5),
  borderRadius: 6,

  fontFamily: theme.typography.fontFamily,

  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest,
  }),

  '--ServerMenu-icon-width': '18px',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  }
}));
