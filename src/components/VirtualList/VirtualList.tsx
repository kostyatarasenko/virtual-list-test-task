import React, { useRef, ReactNode } from 'react';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';

import { useVirtualScrollTrigger } from '../../hooks';

type VirtualListProps<T> = {
  items: T[];
  estimatedItemSize: number;
  renderVirtualItem: (item: VirtualItem<HTMLDivElement>) => ReactNode;
  dimensions?: {
    width?: string;
    height?: string;
  };
  onReachEnd?: () => void;
};

const defaultDimensions = { width: '100vw', height: '100vh' };

const VirtualList = <T,>({
  dimensions,
  estimatedItemSize,
  items,
  onReachEnd,
  renderVirtualItem,
}: VirtualListProps<T>) => {
  const virtualizerWrapperRef = useRef<HTMLDivElement>(null);

  const {
    getVirtualItems,
    getTotalSize,
  } = useVirtualizer({
    count: items.length,
    getScrollElement: () => virtualizerWrapperRef.current,
    estimateSize: () => estimatedItemSize,
  });

  const virtualItems = getVirtualItems();
  const userCardItemTotalSizePx = getTotalSize();

  useVirtualScrollTrigger({
    virtualItems,
    items,
    onReachEnd,
  });

  return (
    <div
      ref={virtualizerWrapperRef}
      style={{
        height: dimensions?.height || defaultDimensions.height,
        width: dimensions?.width || defaultDimensions.width,
        overflowY: 'auto',
        contain: 'strict',
      }}
    >
      <div
        style={{
          height: userCardItemTotalSizePx,
          position: 'relative',
          width: '100%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
          }}
        >
          {
            virtualItems.map((virtualRow) => renderVirtualItem(virtualRow))
          }
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
