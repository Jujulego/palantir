import AutonomousSystemItemSkeleton from '@/components/server/AutonomousSystemItemSkeleton';
import LocationItemSkeleton from '@/components/utils/LocationItemSkeleton';
import PayloadItemSkeleton from '@/components/server/PayloadItemSkeleton';
import List from '@mui/material/List';

export default function WMServerIpInfoLoading() {
  return (
    <List>
      <LocationItemSkeleton />
      <AutonomousSystemItemSkeleton />
      <PayloadItemSkeleton />
    </List>
  );
}
