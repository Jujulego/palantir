import { decodeName, type WithMapAnimalNameParams } from '@/app/(with-map)/animal/[name]/params';
import MapDrawerHeader from '@/components/map/drawer/MapDrawerHeader';
import { IconLink } from '@/components/mui/IconLink';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import { type ReactNode } from 'react';

// Layout
export interface WithMapAnimalNameLayoutProps {
  readonly children: ReactNode;
  readonly params: Promise<WithMapAnimalNameParams>;
}

export default async function WithMapAnimalNameLayout({ children, params }: WithMapAnimalNameLayoutProps) {
  const name = await decodeName(params);

  return (
    <>
      <MapDrawerHeader sx={{ display: 'flex', pl: 2.5, pr: 1, py: 2 }}>
        <Typography component="h1" variant="h5" sx={{ flex: '1', textTransform: 'capitalize' }}>
          { name }
        </Typography>

        <IconLink
          href="/"
          sx={{ flex: '0 0 auto', mt: -1 }}
          aria-label="Close panel"
        >
          <CloseIcon />
        </IconLink>
      </MapDrawerHeader>

      <Divider />

      <Box sx={{ flex: '1 0 0', overflow: 'auto' }}>
        { children }
      </Box>
    </>
  );
}

export async function generateMetadata({ params }: WithMapAnimalNameLayoutProps): Promise<Metadata> {
  const name = await decodeName(params);

  return {
    title: name.charAt(0).toUpperCase() + name.slice(1),
  };
}

export function generateStaticParams(): WithMapAnimalNameParams[] {
  return [
    { name: 'babar' },
    { name: 'boreo' },
    { name: 'charlotte' },
    { name: 'daisy' },
    { name: 'lucille' },
    { name: 'tidal' },
    { name: 'zaza' },
  ];
}
