'use client';

import { MetadataMenuContext } from '@/components/server/menu/metadata-menu.context';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ButtonBase from '@mui/material/ButtonBase';
import Fade from '@mui/material/Fade';
import LinearProgress from '@mui/material/LinearProgress';
import Menu from '@mui/material/Menu';
import Skeleton from '@mui/material/Skeleton';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import { type MouseEvent, type ReactNode, useCallback, useId, useState, useTransition } from 'react';

export interface MetadataMenuProps {
  readonly children: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function MetadataMenu({ children, sx }: MetadataMenuProps) {
  const id = useId();
  const [isLoading, startLoading] = useTransition();

  // Menu state
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  const handleOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchor(null);
  }, []);

  // Selected option
  const [selectedNode, setSelectedNode] = useState<ReactNode>(null);

  // Render
  return (
    <>
      <Fade in={isLoading}>
        <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }} />
      </Fade>

      <TriggerButton
        onClick={handleOpen}
        sx={sx}

        aria-controls={`${id}-menu`}
        aria-expanded={!!anchor}
        aria-label="metadata source menu"
        aria-haspopup="true"
      >
        { selectedNode ?? <Skeleton variant="rounded" height={20} width={80} /> }
        <ExpandMoreIcon fontSize="small" />
      </TriggerButton>

      <Menu
        id={`${id}-menu`}
        open={!!anchor}
        onClick={handleClose}
        onClose={handleClose}
        keepMounted

        anchorEl={anchor}
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
    backgroundColor: theme.vars.palette.action.hover,
  }
}));
