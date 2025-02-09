import seaTurtlePng from '@/assets/sea-turtle.png';
import ColoredImage from '@/components/ColoredImage';
import MapDrawer from '@/components/map/MapDrawer';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import Link from 'next/link';
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
      <Box sx={{ display: 'flex', px: 2.5, py: 2 }}>
        <Typography component="h1" variant="h5" sx={{ flex: '1', textTransform: 'capitalize' }}>
          { name }
        </Typography>

        <IconButton
          component={Link}
          href=".."
          sx={{ mt: -1, mr: -1.5 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      { children }
    </Paper>
  </MapDrawer>;
}
