'use client';

import { VirtualTableColumn } from '@/components/table/virtual-table-column.context';
import { VirtualTableContext } from '@/components/table/virtual-table.context';
import { mergeSx } from '@/lib/utils/mui';
import MuiTableCell, { type TableCellProps } from '@mui/material/TableCell';
import { use } from 'react';

export { type TableCellProps } from '@mui/material/TableCell';

// Component
export default function TableCell(props: TableCellProps) {
  const { isVirtual, columnLayout } = use(VirtualTableContext);
  const column = use(VirtualTableColumn);

  if (!isVirtual) {
    return <MuiTableCell {...props} />;
  }

  return (
    <MuiTableCell
      role={props.scope
        ? (props.scope === 'col' ? 'columnheader' : 'rowheader')
        : (props.component === 'th' ? 'rowheader' : 'gridcell')
      }
      {...props}
      component="div"
      sx={mergeSx({
        display: 'block',
        flex: columnLayout[column] ?? '0 0 auto',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }, props.sx)}
    />
  );
}