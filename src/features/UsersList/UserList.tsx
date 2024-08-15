import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { useCustomInfiniteQuery, useBottomScrollListener } from '../../hooks';

const UserList = () => {
  const userListRef = useRef(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useCustomInfiniteQuery({ queryKey: ['users'] });

  useBottomScrollListener(async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  }, 0, userListRef);

  const rowVirtualizer = useVirtualizer({
    count: data?.length ?? 0,
    getScrollElement: () => userListRef.current,
    estimateSize: () => 76,
  });

  const items = rowVirtualizer.getVirtualItems();

  if (status === 'pending') return <p>Loading...</p>;
  if (status === 'error') return <p>Error: {error.message}</p>;

  return (
    <div
      ref={userListRef}
      style={{
        height: '100vh',
        width: '100vw',
        overflowY: 'auto',
        contain: 'strict',
      }}
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
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
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
        >
          {items.map((virtualRow) => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
            >
              <div style={{padding: '10px 0'}}>
                <div>{data[virtualRow.index].name.title}</div>
                <div>{data[virtualRow.index].name.first}</div>
                <div>{data[virtualRow.index].name.last}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserList;
