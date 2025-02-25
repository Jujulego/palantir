import VirtualCell from '@/components/table/VirtualCell';
import VirtualRow from '@/components/table/VirtualRow';
import VirtualTableSkeleton from '@/components/table/VirtualTableSkeleton';
import UserRowSkeleton from '@/components/users/UserRowSkeleton';

// Component
export default function UserTableSkeleton() {
  return (
    <VirtualTableSkeleton
      columnLayout="1fr 1fr 1fr"
      head={
        <VirtualRow>
          <VirtualCell scope="col" size="small">Name</VirtualCell>
          <VirtualCell scope="col" size="small">Identities</VirtualCell>
          <VirtualCell scope="col" size="small">Last login</VirtualCell>
        </VirtualRow>
      }
    >
      <UserRowSkeleton />
      <UserRowSkeleton />
      <UserRowSkeleton />
    </VirtualTableSkeleton>
  );
}