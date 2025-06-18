'use client';

import { ServerMarkersContext } from '@/components/server/server-markers.context';
import { mergeSx } from '@/lib/utils/mui';
import PlaceIcon from '@mui/icons-material/Place';
import { type SxProps, type Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { m } from 'motion/react';
import { type ReactNode, use } from 'react';

// Component
export interface ServerMarkerIconProps {
  readonly markerKey: string;
  readonly tooltip?: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function ServerMarkerIcon({ markerKey, tooltip, sx }: ServerMarkerIconProps) {
  const { selectedMarker } = use(ServerMarkersContext);
  const selected = selectedMarker === markerKey;

  return (
    <m.div
      initial={{ scale: 0, y: '8.33%' }}
      style={{
        transformOrigin: 'bottom center',
      }}
      animate={{
        scale: selected ? 1.325 : 0.8,
        opacity: selected ? 1 : 0.75,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <Tooltip
        title={tooltip}
        placement="top"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -8],
                }
              }
            ]
          }
        }}
      >
        <PlaceIcon
          sx={mergeSx(
            { color: 'primary.main', filter: 'drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))', fontSize: 36 },
            sx,
            { verticalAlign: 'bottom' },
          )}
        />
      </Tooltip>
    </m.div>
  );
}
