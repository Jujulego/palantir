import VirtualCell from '@/components/table/VirtualCell';
import VirtualRow, { type VirtualRowProps } from '@/components/table/VirtualRow';
import Skeleton from '@mui/material/Skeleton';

// Component
export default function UserRowSkeleton(props: VirtualRowProps) {
  return (
    <VirtualRow {...props}>
      <VirtualCell sx={{ display: 'flex', alignItems: 'center', py: 0, gap: 1 }}>
        <Skeleton variant="circular" height={24} width={24} />
        <Skeleton height="1.65em" sx={{ flexGrow: 1 }} />
      </VirtualCell>
      <VirtualCell sx={{ display: 'flex', alignItems: 'center', py: 0, gap: 1 }}>
        <Skeleton variant="circular" height={24} width={24} />
      </VirtualCell>
      <VirtualCell>
        <Skeleton height="1.65em" width="25%" />
      </VirtualCell>
      <VirtualCell>
        <Skeleton height="1.65em" width="75%" />
      </VirtualCell>
    </VirtualRow>
  );
}