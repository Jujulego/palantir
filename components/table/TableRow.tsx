'use client';

import { VirtualTableColumn } from '@/components/table/virtual-table-column.context';
import { VirtualTableContext } from '@/components/table/virtual-table.context';
import { mergeSx } from '@/lib/utils/mui';
import MuiTableRow, { type TableRowProps } from '@mui/material/TableRow';
import { Children, use } from 'react';

export default function TableRow({ children, ...props }: TableRowProps) {
  const { isVirtual } = use(VirtualTableContext);

  if (!isVirtual) {
    return <MuiTableRow {...props}>{ children }</MuiTableRow>;
  }

  return (
    <MuiTableRow {...props} component="div" sx={mergeSx({ display: 'flex' }, props.sx)}>
      { Children.map(children, (child, idx) => (
        <VirtualTableColumn value={idx}>
          { child }
        </VirtualTableColumn>
      )) }
    </MuiTableRow>
  );
}