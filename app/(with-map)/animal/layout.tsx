import seaTurtlePng from '@/assets/sea-turtle.png';
import MapDrawer from '@/components/map/drawer/MapDrawer';
import MapDrawerIllustration from '@/components/map/drawer/MapDrawerIllustration';
import ColoredImage from '@/components/utils/ColoredImage';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import type { ReactNode } from 'react';

export interface WithMapAnimalLayoutProps {
  readonly children?: ReactNode;
}

export default function withMapAnimalLayout({ children }: WithMapAnimalLayoutProps) {
  return (
    <MapDrawer>
      <MapDrawerIllustration>
        <Box
          sx={{
            position: 'relative',
            height: 230,
            flexShrink: 0,
            color: 'action.selected',
          }}
        >
          <ColoredImage
            src={seaTurtlePng}
            alt="sea turtle"
            priority
            style={{ position: 'absolute', bottom: 0, left: 'calc(50% - 75px)', height: 'auto', width: 150 }}
          />
        </Box>
      </MapDrawerIllustration>

      <Paper square sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        { children }
      </Paper>
    </MapDrawer>
  );
}
