'use client';

import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';

export default function WithMapServerLoading() {
  return (
    <Container>
      <Skeleton variant="rounded" sx={{ height: '100%' }} />
    </Container>
  );
}

// Elements
const Container = styled('div')(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(0.5),
}));
