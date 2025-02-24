'use client';

import { mergeSx } from '@/lib/utils/mui';
import type { SxProps, Theme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { collect$, map$, pipe$ } from 'kyrielle';
import { type ReactNode, type UIEvent, useCallback, useEffect, useRef, useState } from 'react';

// Constants
const DEFAULT_ROW_SIZE = 52.8;

// Component
export interface VirtualTableProps {
  readonly columnLayout: string;
  readonly head?: ReactNode;
  readonly overscan?: number;
  readonly row: (index: number) => ReactNode;
  readonly rowCount: number;
  readonly rowSize?: number;
  readonly sx?: SxProps<Theme>;
}

export default function VirtualTable(props: VirtualTableProps) {
  const {
    columnLayout,
    head,
    overscan = 2,
    row,
    rowCount,
    rowSize = DEFAULT_ROW_SIZE,
    sx
  } = props;

  // Compute printed interval
  const [firstIdx, setFirstIdx] = useState(0);
  const [printedCount, setPrintedCount] = useState(rowCount);

  // Track scroll offset
  const handleScroll = useCallback((event: UIEvent<HTMLTableElement>) => {
    setFirstIdx(firstPrintableRow(event.currentTarget, rowCount, rowSize));
  }, [rowCount, rowSize]);

  // Track container height
  const tableRef = useRef<HTMLTableElement>(null);

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
            Math.max(0, firstIdx - overscan),
            Math.min(firstIdx + printedCount + overscan, rowCount)
          ),
          map$((idx) => row(idx)),
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