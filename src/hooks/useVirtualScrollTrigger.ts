import { useEffect, useRef } from 'react';
import { VirtualItem } from '@tanstack/react-virtual';
import { last as _last } from 'lodash';

type useVirtualScrollTriggerProps<T> = {
  items: T[];
  virtualItems: VirtualItem<HTMLDivElement>[];
  onReachEnd?: () => void;
}

const useVirtualScrollTrigger = <T>({
  virtualItems,
  items,
  onReachEnd,
}: useVirtualScrollTriggerProps<T>) => {
  // Prevent multiple onReachEnd calls with the same items length and virtualItems
  const reachedEndRef = useRef(false);
  const previousItemsLengthRef = useRef(items.length);

  useEffect(() => {
    if (items.length !== previousItemsLengthRef.current) {
      reachedEndRef.current = false;
      previousItemsLengthRef.current = items.length;
    }

    const lastVirtualItem = _last(virtualItems);

    if (!lastVirtualItem) return;

    if (!reachedEndRef.current && onReachEnd && lastVirtualItem.index >= items.length - 1) {
      reachedEndRef.current = true;

      onReachEnd();
    }
  }, [
    onReachEnd,
    items.length,
    virtualItems,
  ]);
};

export default useVirtualScrollTrigger;
