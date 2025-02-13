import computerPng from '@/assets/computer.png';
import ColoredImage from '@/components/ColoredImage';
import MapDrawer from '@/components/map/MapDrawer';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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
          priority
          style={{ position: 'absolute', bottom: 0, left: 'calc(50% - 75px)', height: 'auto', width: 150 }}
        />
      </Box>

      <Paper square sx={{ flex: '1 0 auto', pb: 4 }}>
        { children }
      </Paper>
    </MapDrawer>
  );
}
