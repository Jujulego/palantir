import { mergeSx } from '@/lib/utils/mui';
import TableCell, { type TableCellProps } from '@mui/material/TableCell';

// Component
export type VirtualCellProps = TableCellProps;

export default function VirtualCell({ sx, ...rest }: VirtualCellProps) {
  return (
    <TableCell
      {...rest}
      sx={mergeSx({
        display: 'block',
        position: 'var(--VirtualCell-position, static)',
        top: 0,
        zIndex: 'var(--VirtualCell-zIndex, 0)',
        background: 'var(--VirtualCell-background, transparent)',
      }, sx)}
    />
  );
}