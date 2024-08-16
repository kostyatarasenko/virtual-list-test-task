import React, { useRef, useEffect, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { User } from '../../domains/users';
import { usePaginatedQuery, useInfiniteScrollTrigger } from '../../hooks';
import { Card, SortableItem, SortableList } from '../../components';
import { mergeSortedArray, concatenateStrings } from '../../utils';
import { getUserRealIndex } from '../../domains/users';
import { AVAILABLE_ROUTES } from '../../constants';

const estimatedUserCardHeightPx = 114;
const userIdKey = 'email';

const UserList = () => {
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);

  const virtualizerWrapperRef = useRef<HTMLDivElement>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = usePaginatedQuery({
    queryKey: ['users'],
    route: AVAILABLE_ROUTES.GET_USERS,
  });

  const {
    getVirtualItems,
    getTotalSize,
  } = useVirtualizer({
    count: sortedUsers.length,
    getScrollElement: () => virtualizerWrapperRef.current,
    estimateSize: () => estimatedUserCardHeightPx,
  });

  useEffect(() => {
    if (data) {
      setSortedUsers((prevState) => mergeSortedArray<User>(data, prevState, userIdKey));
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
      itemIdKey={userIdKey}
      setItems={setSortedUsers}
    >
      <div
        ref={virtualizerWrapperRef}
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

              const ordinalNumber = getUserRealIndex(data, sortedUsers, virtualRow.index) + 1;

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
