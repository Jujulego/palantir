'use client';

import MapMarker from '@/components/map/MapMarker';
import { mergeSx } from '@/lib/utils/mui';
import PlaceIcon from '@mui/icons-material/Place';
import { type SxProps, type Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { m } from 'motion/react';
import { type ReactNode } from 'react';

// Component
export interface ServerMarkerProps {
  readonly latitude: number;
  readonly longitude: number;
  readonly tooltip?: ReactNode;
  readonly selected?: boolean;
  readonly sx?: SxProps<Theme>;
}

export default function ServerMarker({ latitude, longitude, tooltip, selected, sx }: ServerMarkerProps) {
  return (
    <MapMarker latitude={latitude} longitude={longitude}>
      <m.div
        initial={{ scale: 0, translateY: '8.33%' }}
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
    </MapMarker>
  );
}
