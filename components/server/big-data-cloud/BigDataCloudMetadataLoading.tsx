import AutonomousSystemItemSkeleton from '@/components/server/AutonomousSystemItemSkeleton';
import PayloadItemSkeleton from '@/components/server/PayloadItemSkeleton';
import LocationItemSkeleton from '@/components/utils/LocationItemSkeleton';
import TagsItemSkeleton from '@/components/utils/TagsItemSkeleton';
import List from '@mui/material/List';

export default async function BigDataCloudMetadataLoading() {
  return (
    <List>
      <LocationItemSkeleton />
      <AutonomousSystemItemSkeleton />
      <TagsItemSkeleton />
      <PayloadItemSkeleton />
    </List>
  );
}