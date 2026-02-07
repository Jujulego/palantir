import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';

// Component
export interface SearchProviderProps {
  readonly className?: string;
}

export function SearchBoxSkeleton({ className }: SearchProviderProps) {
  return (
    <Paper className={clsx('rounded-full h-12 p-1', className)}>
      <Skeleton variant="rounded" sx={{ height: '100%', borderRadius: 16 }} />
    </Paper>
  );
}
