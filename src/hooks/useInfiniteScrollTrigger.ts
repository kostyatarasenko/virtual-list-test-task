import { useEffect } from 'react';
import { last as _last } from 'lodash';
import { VirtualItem } from '@tanstack/react-virtual';

type UseInfiniteScrollTriggerProps<T> = {
  virtualItems: VirtualItem<HTMLDivElement>[];
  data?: T[];
  onReachEnd?: () => void;
}

const useInfiniteScrollTrigger = <T>({
  virtualItems,
  data,
  onReachEnd,
}: UseInfiniteScrollTriggerProps<T>) => {
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
