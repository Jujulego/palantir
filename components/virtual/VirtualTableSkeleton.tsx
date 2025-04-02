import { mergeSx } from '@/lib/utils/mui';
import Table, { type TableProps } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { ResponsiveStyleValue } from '@mui/system';
import { type ReactNode } from 'react';

// Component
export interface VirtualTableSkeletonProps extends Omit<TableProps, 'component'> {
  readonly columnLayout: ResponsiveStyleValue<string>;
  readonly head?: ReactNode;
}

export default function VirtualTableSkeleton(props: VirtualTableSkeletonProps) {
  const {
    children,
    columnLayout,
    head,
    sx,
    ...tableProps
  } = props;

  // Render
  return (
    <Table
      {...tableProps}
      sx={mergeSx(sx, {
        display: 'grid',
        gridTemplateColumns: columnLayout,
        gridTemplateRows: 'auto 1fr',
        overflow: 'auto'
      })}
    >
      { head && (
        <TableHead
          role="rowgroup"
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            display: 'grid',
            gridColumn: '1 / -1',
            gridTemplateColumns: 'subgrid',
            background: 'var(--mui-palette-background-default)',
          }}
        >
          { head }
        </TableHead>
      ) }

      <TableBody
        role="rowgroup"
        sx={{
          display: 'grid',
          gridColumn: '1 / -1',
          gridTemplateColumns: 'subgrid',
        }}
      >
        { children }
      </TableBody>
    </Table>
  );
}
