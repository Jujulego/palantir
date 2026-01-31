import Skeleton from '@mui/material/Skeleton';
import type { SxProps, Theme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

// Component
export interface UserLayoutToolbarSkeletonProps {
  readonly sx?: SxProps<Theme>;
}

export default async function UserLayoutToolbarSkeleton({ sx }: UserLayoutToolbarSkeletonProps) {
  return (
    <Toolbar sx={sx}>
      <Skeleton variant="circular" sx={{ height: 48, width: 48, mr: 2 }}  />

      <span className="typography-h4 grow shrink-0 basis-0">
        <Skeleton width="25%" />
      </span>
    </Toolbar>
  );
}
