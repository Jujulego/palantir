import seaTurtlePng from '@/assets/sea-turtle.png';
import ColoredImage from '@/components/ColoredImage';
import MapDrawer from '@/components/map/MapDrawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import { type ReactNode } from 'react';

export interface WithMapNameLayoutProps {
  readonly children: ReactNode;
  readonly params: Promise<{
    readonly name: string;
  }>;
}

export async function generateMetadata({ params }: WithMapNameLayoutProps): Promise<Metadata> {
  return {
    title: decodeURIComponent((await params).name),
  };
}

export default async function WithMapNameLayout({ children, params }: WithMapNameLayoutProps) {
  const name = decodeURIComponent((await params).name);

  return <MapDrawer>
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
        alt="computer"
        style={{ position: 'absolute', bottom: 0, left: 'calc(50% - 75px)', height: 'auto', width: 150 }}
      />
    </Box>

    <Paper component="main" square sx={{ flex: '1 0 auto', pb: 4 }}>
      <Box sx={{ px: 2.5, py: 2 }}>
        <Typography component="h1" variant="h5" sx={{ textTransform: 'capitalize' }}>{ name }</Typography>
      </Box>

      <Divider />

      { children }
    </Paper>
  </MapDrawer>;
}
