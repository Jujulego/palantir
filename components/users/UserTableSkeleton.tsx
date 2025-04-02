import VirtualCell from '@/components/virtual/VirtualCell';
import VirtualRow from '@/components/virtual/VirtualRow';
import VirtualTableSkeleton from '@/components/virtual/VirtualTableSkeleton';
import UserRowSkeleton from '@/components/users/UserRowSkeleton';

// Component
export default function UserTableSkeleton() {
  return (
    <VirtualTableSkeleton
      columnLayout={{
        '@xs': '1fr 1fr',
        '@sm': '2fr 1fr 2fr',
        '@md': '2fr 2fr 1fr 1fr 2fr',
      }}
      head={
        <VirtualRow>
          <VirtualCell scope="col" size="small">Name</VirtualCell>
          <VirtualCell scope="col" size="small" sx={{ display: { '@xs': 'none', '@md': 'block' } }}>Email</VirtualCell>
          <VirtualCell scope="col" size="small" sx={{ display: { '@xs': 'none', '@sm': 'block' } }}>Identities</VirtualCell>
          <VirtualCell scope="col" size="small" sx={{ display: { '@xs': 'none', '@md': 'block' } }}>Login count</VirtualCell>
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