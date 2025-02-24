'use client';

import { mergeSx } from '@/lib/utils/mui';
import type { TableProps } from '@mui/material';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import {
  createContext,
  type CSSProperties,
  type HTMLProps,
  type Key,
  memo,
  type ReactNode,
  use,
  useEffect,
  useRef,
  useState
} from 'react';
import { areEqual, FixedSizeList, type ListChildComponentProps } from 'react-window';

// Constants
const DEFAULT_ROW_SIZE = 52.8;

// Context
export interface VirtualContextProps {
  readonly columnLayout: string;
  readonly rowSize: number;
  readonly head?: ReactNode;
}

const VirtualContext = createContext<VirtualContextProps>({
  columnLayout: '',
  rowSize: DEFAULT_ROW_SIZE
});

// Component
export interface VirtualTableProps<D = unknown> {
  readonly columnLayout: string;
  readonly data: D;

  readonly head?: ReactNode;

  readonly row: RowFn<D>;
  readonly rowKey: (index: number, data: D) => Key;
  readonly rowCount: number;
  readonly rowSize?: number;

  readonly sx?: SxProps<Theme>;
}

export default function VirtualTable<D>(props: VirtualTableProps<D>) {
  const {
    columnLayout, data,
    head,
    row, rowKey, rowCount, rowSize = DEFAULT_ROW_SIZE,
    sx
  } = props;

  // Track container height
  const containerRef = useRef<HTMLTableElement>(null);
  const [height, setHeight] = useState(rowCount * rowSize);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      setHeight(entries[0].contentRect.height);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Render
  return (
    <Box
      ref={containerRef}
      sx={mergeSx(sx, { overflow: 'hidden' })}
    >
      <VirtualContext value={{ columnLayout, head, rowSize }}>
        <FixedSizeList
          height={height}
          width="100%"
          outerElementType={OuterElement}
          innerElementType={InnerElement}
          overscanCount={5}

          itemData={{ data, row: row as RowFn, rowSize }}
          itemKey={(index, { data }) => rowKey(index, data as D)}
          itemCount={rowCount}
          itemSize={rowSize}
        >
          { InnerRow }
        </FixedSizeList>
      </VirtualContext>
    </Box>
  );
}

// Elements
interface ItemData<D = unknown> {
  readonly data: D;
  readonly row: RowFn<D>;
}

export type RowFn<in D = unknown> = (index: number, data: D, style: CSSProperties) => ReactNode

function OuterElement({ children, ...rest }: TableProps) {
  const { head, columnLayout } = use(VirtualContext);

  return (
    <Table
      {...rest}
      sx={{
        display: 'grid',
        gridTemplateColumns: columnLayout,
        gridTemplateRows: 'auto 1fr',
      }}
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
      { children }
    </Table>
  );
}

function InnerElement({ children, ...rest }: HTMLProps<HTMLTableSectionElement>) {
  const { rowSize } = use(VirtualContext);

  return (
    <TableBody
      {...rest}
      sx={{
        display: 'grid',
        gridColumn: '1 / -1',
        gridTemplateColumns: 'subgrid',
        gridAutoRows: rowSize
      }}
    >
      { children }
    </TableBody>
  );
}

const InnerRow = memo(function InnerRow<D>(props: ListChildComponentProps<ItemData<D>>) {
  return props.data.row(props.index, props.data.data, props.style);
}, areEqual);