import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function LocateLoading() {
  return (
    <Box
      sx={{
        display: 'flex', flexDirection: 'column', gap: 1,
        m: -0.5,
        p: 0.5,
        gridArea: {
          xs: '2 / 1 / 2 / span 2',
          sm: '2 / 1',
        },
        overflow: 'auto',
      }}
    >
      <Skeleton variant="rounded" height={72} sx={{ borderRadius: 3 }} />
      <Skeleton variant="rounded" height={72} sx={{ borderRadius: 3 }} />
      <Skeleton variant="rounded" height={72} sx={{ borderRadius: 3 }} />
    </Box>
  )
}
