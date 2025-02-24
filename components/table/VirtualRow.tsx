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
      aria-rowindex={typeof rowIndex === 'number' ? rowIndex + 1 : undefined}
      sx={mergeSx(sx, {
        display: 'contents',
        '--VirtualCell-rowIndex': rowIndex ? rowIndex + 1 : 'auto',
      })}
    />
  );
}