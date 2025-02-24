'use client';

import { VirtualTableContext } from '@/components/table/virtual-table.context';
import { mergeSx } from '@/lib/utils/mui';
import type { AllOrNothing } from '@/lib/utils/types';
import type { TableProps } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import {
  type CSSProperties,
  type HTMLProps,
  type Key, memo,
  type ReactNode,
  type Ref,
  use,
  useCallback,
  useMemo
} from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { areEqual, type ListChildComponentProps, VariableSizeList, type VariableSizeListProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

// Component
interface VirtualTableHeaderProps {
  readonly headerRow: ReactNode;
  readonly headerSize: number;
}

interface VirtualTableRowProps<D> {
  readonly row: (idx: number, data: D, style: CSSProperties) => ReactNode;
  readonly rowCount: number;
  readonly rowData: D;
  readonly rowKey: (idx: number, data: D) => Key;
  readonly rowSize?: number;
}

interface VirtualTableSkeletonProps<D> {
  readonly skeletonRow: (idx: number, data: D, style: CSSProperties) => ReactNode;
  readonly skeletonCount: number;
}

interface VirtualTableOptions {
  readonly columnLayout?: readonly string[];
  readonly onLoadMore?: (startIdx: number, stopIdx: number) => Promise<void>;
}

export type VirtualTableProps<D> = Omit<TableProps, 'component' | 'children'>
  & VirtualTableOptions
  & VirtualTableRowProps<D>
  & AllOrNothing<VirtualTableHeaderProps>
  & AllOrNothing<VirtualTableSkeletonProps<D>>;

export default function VirtualTable<D>(props: VirtualTableProps<D>) {
  const {
    columnLayout = [], onLoadMore,
    row, rowCount, rowData, rowKey, rowSize = 52.8,
    headerRow, headerSize = 52.8,
    skeletonRow, skeletonCount = 0,
    ...tableProps
  } = props;

  // Prepare item data
  const itemCount = (headerRow ? rowCount + 1 : rowCount) + skeletonCount;
  
  const itemData = useMemo<ItemData>(() => ({
    hasHeaderRow: !!headerRow,
    row, rowCount, rowData,
    skeletonRow,
  }), [headerRow, row, rowCount, rowData, skeletonRow]);
  
  const itemKey = useCallback((idx: number, { rowData }: ItemData) => {
    if (headerRow) {
      if (idx === 0) return '--header--';
      
      idx--;
    }
    
    if (idx > rowCount) {
      return `--skeleton-${idx - rowCount}--`;
    }
    
    return rowKey(idx, rowData as D);
  }, [headerRow, rowCount, rowKey]);
  
  const itemSize = useCallback((idx: number) => {
    return headerRow && idx === 0 ? headerSize : rowSize;
  }, [headerRow, headerSize, rowSize]);

  // Render
  const List = useCallback(({ ref, height, onItemsRendered }: Pick<VariableSizeListProps, 'height' | 'onItemsRendered'> & { ref?: Ref<any> }) => (
    <VariableSizeList
      ref={ref}
      height={height} width="100%"
      innerElementType={InnerElement}
      overscanCount={5}
      onItemsRendered={onItemsRendered}
      
      itemCount={itemCount}
      itemData={itemData}
      itemKey={itemKey}
      itemSize={itemSize}
      estimatedItemSize={(headerSize + (rowCount + skeletonCount) * rowSize) / itemCount}
    >
      { Row }
    </VariableSizeList>
  ), [headerSize, itemCount, itemData, itemKey, itemSize, rowCount, rowSize, skeletonCount]);

  const InfiniteList = useMemo(() => {
    if (onLoadMore) {
      return function InfiniteList({ height }: Pick<VariableSizeListProps, 'height'>) {
        return (
          <InfiniteLoader
            isItemLoaded={(index) => index < itemCount - skeletonCount}
            itemCount={itemCount}
            loadMoreItems={onLoadMore}
          >
            {({ ref, onItemsRendered }) => List({ ref, height, onItemsRendered })}
          </InfiniteLoader>
        );
      };
    }

    return List;
  }, [List, itemCount, onLoadMore, skeletonCount]);

  return (
    <VirtualTableContext value={{ isVirtual: true, columnLayout, headerRow, headerSize }}>
      <Table
        {...tableProps}
        component="div"
        sx={mergeSx(tableProps.sx, {
          display: 'block',
          overflow: 'hidden',
        })}
      >
        <AutoSizer defaultHeight={headerSize + skeletonCount * rowSize} disableWidth>
          {InfiniteList}
        </AutoSizer>
      </Table>
    </VirtualTableContext>
  );
}

// Utils
interface ItemData {
  readonly hasHeaderRow: boolean;
  
  readonly row: (idx: number, data: any, style: CSSProperties) => ReactNode;
  readonly rowCount: number;
  readonly rowData: unknown;
  
  readonly skeletonRow?: (idx: number, data: any, style: CSSProperties) => ReactNode;
}

function InnerElement({ ref, children, ...rest }: HTMLProps<HTMLDivElement>) {
  const { headerRow, headerSize } = use(VirtualTableContext);

  return (
    <div ref={ref} {...rest}>
      { headerRow && (
        <TableHead
          component="div"
          sx={{
            display: 'block',
            position: 'sticky',
            top: 0, left: 0, zIndex: 2,
            width: '100%', height: headerSize,
            bgcolor: 'background.default',
          }}
        >
          { headerRow }
        </TableHead>
      ) }

      <TableBody component="div" sx={{ display: 'block' }}>
        { children }
      </TableBody>
    </div>
  );
}

const Row = memo(function Row({ index, data, style }: ListChildComponentProps<ItemData>) {
  const {
    hasHeaderRow,
    row, rowCount, rowData,
    skeletonRow,
  } = data;

  if (hasHeaderRow) {
    if (index === 0) return null;

    index--;
  }

  if (index >= rowCount) {
    if (!skeletonRow) return null;

    return skeletonRow(index, rowData, style);
  }

  return row(index, rowData, style);
}, areEqual);