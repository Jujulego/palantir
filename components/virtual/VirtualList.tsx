'use client';

import { count$ } from '@/lib/utils/kyrielle';
import Box from '@mui/material/Box';
import List, { type ListProps } from '@mui/material/List';
import { collect$, map$, pipe$ } from 'kyrielle';
import { type ReactNode, type UIEvent, useCallback, useEffect, useRef, useState } from 'react';

// Constants
const DEFAULT_ITEM_SIZE = 48;

// Component
export interface VirtualListProps<in out D = unknown> extends ListProps {
  readonly data: D;
  readonly loadedCount?: number;
  readonly item: ItemFn<D>;
  readonly itemCount: number;
  readonly itemOverScan?: number;
  readonly itemSize?: number;

  readonly onIntervalChange?: (interval: ItemInterval) => void;
}

export default function VirtualList<D>(props: VirtualListProps<D>) {
  const {
    data,
    loadedCount,
    onIntervalChange,
    item,
    itemCount,
    itemOverScan = 2,
    itemSize = DEFAULT_ITEM_SIZE,
    sx,
    ...listProps
  } = props;

  // Synchronize with screen
  const containerRef = useRef<HTMLElement>(null);
  
  const [firstIdx, setFirstIdx] = useState(0);
  const [printedCount, setPrintedCount] = useState(loadedCount ?? itemCount);
  const [isSynchronized, setIsSynchronized] = useState(false);

  const handleScroll = useCallback((event: UIEvent<HTMLElement>) => {
    setFirstIdx(firstPrintableItem(event.currentTarget, itemCount, itemSize));
  }, [itemCount, itemSize]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Update to match screen
    setFirstIdx(firstPrintableItem(containerRef.current, itemCount, itemSize));
    setPrintedCount(printableItemCount(containerRef.current, itemCount, itemSize));
    setIsSynchronized(true);

    // Track updates
    const observer = new ResizeObserver((entries) => {
      if (!entries[0]) {
        return;
      }

      setPrintedCount(printableItemCount(entries[0].target as HTMLTableElement, itemCount, itemSize));
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      setIsSynchronized(false);
    };
  }, [itemCount, itemSize]);

  // Compute rendered interval
  const first = Math.max(0, firstIdx - itemOverScan);
  const last = Math.min(firstIdx + printedCount + itemOverScan, itemCount);
  
  useEffect(() => {
    if (!isSynchronized) return;

    if (onIntervalChange) {
      onIntervalChange({ first, last });
    }
  }, [first, isSynchronized, last, onIntervalChange]);

  // Render
  return (
    <Box ref={containerRef} onScroll={handleScroll} sx={sx}>
      <List
        component="ul"
        {...listProps}
        sx={{
          display: 'grid',
          height: itemCount * itemSize,
          alignContent: 'start',
          gridTemplateColumns: '1fr',
          gridAutoRows: itemSize,
          overflow: 'auto'
        }}
      >
        { pipe$(
          count$(first, last),
          map$((index) => item({ index, data })),
          collect$()
        ) }
      </List>
    </Box>
  );
}

// Types
export interface ItemInterval {
  readonly first: number;
  readonly last: number;
}

export interface ItemFnArg<out D = unknown> {
  readonly data: D;
  readonly index: number;
}

export type ItemFn<in D> = (arg: ItemFnArg<D>) => ReactNode;

// Utils
function firstPrintableItem(list: HTMLElement, rowCount: number, rowSize: number): number {
  const scrollOffset = Math.max(0, Math.min(list.scrollTop, list.scrollHeight - list.clientHeight));

  return Math.max(0, Math.min(rowCount - 1, Math.floor(scrollOffset / rowSize)));
}

function printableItemCount(list: HTMLElement, rowCount: number, rowSize: number): number {
  return Math.max(0, Math.min(rowCount, Math.ceil(list.clientHeight / rowSize)));
}
