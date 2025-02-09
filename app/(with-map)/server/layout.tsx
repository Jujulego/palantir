import computerPng from '@/assets/computer.png';
import ColoredImage from '@/components/ColoredImage';
import MapDrawer from '@/components/map/MapDrawer';
import Box from '@mui/material/Box';
import type { ReactNode } from 'react';

export interface WithMapServerLayoutProps {
  readonly children?: ReactNode;
}

export default function withMapServerLayout({ children }: WithMapServerLayoutProps) {
  return (
    <MapDrawer>
      <Box
        sx={{
          position: 'relative',
          height: 230,
          flexShrink: 0,
          color: 'action.selected',
        }}
      >
        <ColoredImage
          src={computerPng}
          alt="computer"
          style={{ position: 'absolute', bottom: 0, left: 'calc(50% - 75px)', height: 'auto', width: 150 }}
        />
      </Box>

      { children }
    </MapDrawer>
  );
}
