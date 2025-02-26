import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

export default async function UserLayoutHeadingSkeleton() {
  return (
    <Box sx={{ display: 'flex', mx: 3, mb: 3 }}>
      <Skeleton variant="circular" sx={{ height: 48, width: 48, mr: 2 }}  />

      <Typography component="span" variant="h4" sx={{ flex: '1 0 0' }}>
        <Skeleton width="25%" />
      </Typography>
    </Box>
  );
}
