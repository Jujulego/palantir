import AutonomousSystemItemSkeleton from '@/components/server/AutonomousSystemItemSkeleton';
import LocationItemSkeleton from '@/components/utils/LocationItemSkeleton';
import PayloadItemSkeleton from '@/components/server/PayloadItemSkeleton';
import TagsItemSkeleton from '@/components/utils/TagsItemSkeleton';
import List from '@mui/material/List';

export default function WMServerIpGeolocationLoading() {
  return (
    <List>
      <LocationItemSkeleton />
      <AutonomousSystemItemSkeleton />
      <TagsItemSkeleton />
      <PayloadItemSkeleton />
    </List>
  );
}
