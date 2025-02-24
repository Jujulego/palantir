import { mergeSx } from '@/lib/utils/mui';
import TableRow, { type TableRowProps } from '@mui/material/TableRow';

// Component
export interface VirtualRowProps extends TableRowProps {
  readonly rowIndex?: number;
}

export default function VirtualRow({ rowIndex, sx, ...rest }: VirtualRowProps) {
  return (
    <TableRow
      {...rest}
      sx={mergeSx(sx, {
        display: 'grid',
        gridColumn: '1 / -1',
        gridRow: rowIndex ? rowIndex + 1 : 'auto',
        gridTemplateColumns: 'subgrid',
      })}
    />
  );
}