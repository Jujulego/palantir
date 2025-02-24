'use client';

import { mergeSx } from '@/lib/utils/mui';
import Table, { type TableProps } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { collect$, map$, pipe$ } from 'kyrielle';
import { type ReactNode, type UIEvent, useCallback, useEffect, useRef, useState } from 'react';

// Constants
const DEFAULT_ROW_SIZE = 52.68;

// Component
export interface RowFnArg<out D = unknown> {
  readonly data: D;
  readonly index: number;
}

export type RowFn<in D> = (arg: RowFnArg<D>) => ReactNode;

export interface VirtualTableProps<in out D = unknown> extends Omit<TableProps, 'component'> {
  readonly columnLayout: string;
  readonly data: D;
  readonly head?: ReactNode;
  readonly row: RowFn<D>;
  readonly rowCount: number;
  readonly rowOverScan?: number;
  readonly rowSize?: number;
}

export default function VirtualTable<D>(props: VirtualTableProps<D>) {
  const {
    columnLayout,
    data,
    head,
    row,
    rowCount,
    rowOverScan = 2,
    rowSize = DEFAULT_ROW_SIZE,
    sx,
    ...tableProps
  } = props;

  // Compute printed interval
  const tableRef = useRef<HTMLTableElement>(null);
  
  const [firstIdx, setFirstIdx] = useState(0);
  const [printedCount, setPrintedCount] = useState(rowCount);

  // Track scroll offset
  const handleScroll = useCallback((event: UIEvent<HTMLTableElement>) => {
    setFirstIdx(firstPrintableRow(event.currentTarget, rowCount, rowSize));
  }, [rowCount, rowSize]);

  useEffect(() => {
    if (tableRef.current) setFirstIdx(firstPrintableRow(tableRef.current, rowCount, rowSize));
  }, [rowCount, rowSize]);

  // Track container height
  useEffect(() => {
    if (!tableRef.current) return;

    // Update to current count
    setPrintedCount(printableRowCount(tableRef.current, rowCount, rowSize));

    // Track updates
    const observer = new ResizeObserver((entries) => {
      if (!entries[0]) {
        return;
      }

      setPrintedCount(printableRowCount(entries[0].target as HTMLTableElement, rowCount, rowSize));
    });
    observer.observe(tableRef.current);

    return () => observer.disconnect();
  }, [rowCount, rowSize]);

  // Render
  return (
    <Table
      ref={tableRef}
      {...tableProps}
      onScroll={handleScroll}
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
            display: 'grid',
            gridColumn: '1 / -1',
            gridTemplateColumns: 'subgrid',

            '--VirtualCell-position': 'sticky',
            '--VirtualCell-zIndex': '10',
            '--VirtualCell-background': 'var(--mui-palette-background-default)',
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
          gridAutoRows: rowSize,
          height: rowCount * rowSize,
        }}
      >
        { pipe$(
          count$(
            Math.max(0, firstIdx - rowOverScan),
            Math.min(firstIdx + printedCount + rowOverScan, rowCount)
          ),
          map$((index) => row({ index, data })),
          collect$()
        ) }
      </TableBody>
    </Table>
  );
}

// Utils
function* count$(start: number, end: number): Generator<number> {
  let idx = start;

  while (idx < end) {
    yield idx++;
  }
}

function firstPrintableRow(table: HTMLTableElement, rowCount: number, rowSize: number): number {
  const scrollOffset = Math.max(0, Math.min(table.scrollTop, table.scrollHeight - table.clientHeight));

  return Math.max(0, Math.min(rowCount - 1, Math.floor(scrollOffset / rowSize)));
}

function printableRowCount(table: HTMLTableElement, rowCount: number, rowSize: number): number {
  let height = table.clientHeight;

  if (table.tHead) {
    height -= table.tHead.offsetHeight;
  }

  return Math.max(0, Math.min(rowCount, Math.ceil(height / rowSize)));
}