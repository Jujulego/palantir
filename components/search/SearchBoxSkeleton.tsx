import { mergeSx } from '@/lib/utils/mui';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import type { SxProps, Theme } from '@mui/material/styles';

// Component
export interface SearchProviderProps {
  readonly sx?: SxProps<Theme>;
}

export function SearchBoxSkeleton({ sx }: SearchProviderProps) {
  return (
    <Paper sx={mergeSx(sx, { borderRadius: 24, height: 48, p: 0.5 })}>
      <Skeleton variant="rounded" sx={{ height: '100%', borderRadius: 16 }} />
    </Paper>
  );
}
