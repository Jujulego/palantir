import VirtualCell from '@/components/virtual/VirtualCell';
import VirtualRow, { type VirtualRowProps } from '@/components/virtual/VirtualRow';
import Skeleton from '@mui/material/Skeleton';

// Component
export default function UserRowSkeleton(props: VirtualRowProps) {
  return (
    <VirtualRow {...props}>
      <VirtualCell sx={{ display: 'flex', alignItems: 'center', py: 0, gap: 1 }}>
        <Skeleton variant="circular" height={24} width={24} />
        <Skeleton sx={{ flexGrow: 1 }} />
      </VirtualCell>
      <VirtualCell sx={{ display: { xs: 'none', md: 'block' } }}>
        <Skeleton width="75%" />
      </VirtualCell>
      <VirtualCell sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', py: 0, gap: 1 }}>
        <Skeleton variant="circular" height={24} width={24} />
      </VirtualCell>
      <VirtualCell sx={{ display: { xs: 'none', md: 'block' } }}>
        <Skeleton width="25%" />
      </VirtualCell>
      <VirtualCell>
        <Skeleton width="75%" />
      </VirtualCell>
    </VirtualRow>
  );
}