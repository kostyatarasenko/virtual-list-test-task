import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { useCustomInfiniteQuery, useInfiniteScrollTrigger } from '../../hooks';
import { Card } from '../../views';

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

  const rowVirtualizer = useVirtualizer({
    count: data?.length ?? 0,
    getScrollElement: () => userListRef.current,
    estimateSize: () => 114,
  });

  const items = rowVirtualizer.getVirtualItems();

  useInfiniteScrollTrigger({
    virtualItems: items,
    data,
    onReachEnd: async () => {
      if (hasNextPage && !isFetchingNextPage) {
        await fetchNextPage();
      }
    },
  });

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
          {items.map((virtualRow) => {
            const { title, first, last } = data[virtualRow.index].name;
            const userFullName = `№ ${virtualRow.index} ${title} ${first} ${last}`;

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
              >
                <Card
                  text={userFullName}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default UserList;
