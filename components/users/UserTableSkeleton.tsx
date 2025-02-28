import VirtualCell from '@/components/table/VirtualCell';
import VirtualRow from '@/components/table/VirtualRow';
import VirtualTableSkeleton from '@/components/table/VirtualTableSkeleton';
import UserRowSkeleton from '@/components/users/UserRowSkeleton';

// Component
export default function UserTableSkeleton() {
  return (
    <VirtualTableSkeleton
      columnLayout="2fr 2fr 1fr 1fr 2fr"
      head={
        <VirtualRow>
          <VirtualCell scope="col" size="small">Name</VirtualCell>
          <VirtualCell scope="col" size="small">Email</VirtualCell>
          <VirtualCell scope="col" size="small">Identities</VirtualCell>
          <VirtualCell scope="col" size="small">Login count</VirtualCell>
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