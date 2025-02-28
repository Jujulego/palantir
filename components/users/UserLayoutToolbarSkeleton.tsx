import Skeleton from '@mui/material/Skeleton';
import type { SxProps, Theme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Component
export interface UserLayoutToolbarSkeletonProps {
  readonly sx?: SxProps<Theme>;
}

export default async function UserLayoutToolbarSkeleton({ sx }: UserLayoutToolbarSkeletonProps) {
  return (
    <Toolbar sx={sx}>
      <Skeleton variant="circular" sx={{ height: 48, width: 48, mr: 2 }}  />

      <Typography component="span" variant="h4" sx={{ flex: '1 0 0' }}>
        <Skeleton width="25%" />
      </Typography>
    </Toolbar>
  );
}
