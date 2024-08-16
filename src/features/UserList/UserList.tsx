import React, { useRef, useEffect, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { User } from '../../types';
import { useCustomInfiniteQuery, useInfiniteScrollTrigger } from '../../hooks';
import { Card, SortableItem, SortableList } from '../../views';
import { mergeSortedArray, concatenateStrings } from '../../utils';
import { getUserItemRealIndex } from '../../domains/users';

const estimatedUserCardHeightPx = 114;

const UserList = () => {
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);

  const userListRef = useRef<HTMLDivElement>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useCustomInfiniteQuery({ queryKey: ['users'] });

  const {
    getVirtualItems,
    getTotalSize,
  } = useVirtualizer({
    count: sortedUsers.length,
    getScrollElement: () => userListRef.current,
    estimateSize: () => estimatedUserCardHeightPx,
  });

  useEffect(() => {
    if (data) {
      setSortedUsers((prevState) => mergeSortedArray<User>(data, prevState, 'email'));
    }
  }, [data]);

  const virtualUserCardItems = getVirtualItems();
  const userCardItemTotalSizePx = getTotalSize();

  const handleFetchNextPage = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  useInfiniteScrollTrigger<User>({
    virtualItems: virtualUserCardItems,
    data,
    onReachEnd: handleFetchNextPage,
  });

  if (status === 'pending') return <p>Loading...</p>;
  if (status === 'error') return <p>Error: {error.message}</p>;

  return (
    <SortableList
      items={sortedUsers}
      itemIdKey="email"
      setItems={setSortedUsers}
    >
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
              transform: `translateY(${virtualUserCardItems[0]?.start ?? 0}px)`,
            }}
          >
            {virtualUserCardItems.map((virtualRow) => {
              const user = sortedUsers[virtualRow.index];

              const ordinalNumber = getUserItemRealIndex(data, sortedUsers, virtualRow.index) + 1;

              const { title, first, last} = user.name;
              const userFullName = concatenateStrings('№', ordinalNumber, title, first, last);

              return (
                <SortableItem
                  key={virtualRow.key}
                  id={user.email}
                >
                  <Card
                    text={userFullName}
                  />
                </SortableItem>
              );
            })}
          </div>
        </div>
      </div>
    </SortableList>
  );
};

export default UserList;
