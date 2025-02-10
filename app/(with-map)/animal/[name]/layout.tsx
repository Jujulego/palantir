import type { WithMapAnimalNameParams } from '@/app/(with-map)/animal/[name]/params';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import Link from 'next/link';
import { type ReactNode } from 'react';

export interface WithMapAnimalNameLayoutProps {
  readonly children: ReactNode;
  readonly params: Promise<WithMapAnimalNameParams>;
}

export async function generateMetadata({ params }: WithMapAnimalNameLayoutProps): Promise<Metadata> {
  return {
    title: decodeURIComponent((await params).name),
  };
}

export default async function WithMapAnimalNameLayout({ children, params }: WithMapAnimalNameLayoutProps) {
  const name = decodeURIComponent((await params).name);

  return (
    <>
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
    </>
  );
}
