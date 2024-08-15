import { useEffect } from 'react';
import { last as _last } from 'lodash';
import { VirtualItem } from '@tanstack/react-virtual';

interface UseInfiniteScrollTriggerProps {
  virtualItems: VirtualItem<HTMLDivElement>[];
  data?: any[];
  onReachEnd?: () => void;
}

const useInfiniteScrollTrigger = ({
  virtualItems,
  data,
  onReachEnd,
}: UseInfiniteScrollTriggerProps) => {
  useEffect(() => {
    const lastItem = _last(virtualItems);

    if (!lastItem || !data) {
      return;
    }

    if (onReachEnd && lastItem.index >= data.length - 1) {
      onReachEnd();
    }
  }, [
    onReachEnd,
    data,
    virtualItems,
  ]);
};

export default useInfiniteScrollTrigger;
