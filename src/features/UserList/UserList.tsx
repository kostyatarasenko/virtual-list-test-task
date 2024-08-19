import React, { useEffect, useState } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { get as _get } from 'lodash';
import { arrayMove } from '@dnd-kit/sortable';

import { User, getUserRealIndex } from '../../domains/users';
import { usePaginatedQuery } from '../../hooks';
import { Card, SortableItem, SortableContextProvider, VirtualList } from '../../components';
import { mergeSortedArray, concatenateStrings } from '../../utils';
import { AVAILABLE_ROUTES } from '../../constants';

const ESTIMATED_USER_CARD_HEIGHT_PX = 114;
// Backend could respond user with no id value, so we need to use email as a key
const USER_ID_KEY = 'email';

const UserList = () => {
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = usePaginatedQuery<User>({
    queryKey: ['users'],
    route: AVAILABLE_ROUTES.GET_USERS,
  });

  useEffect(() => {
    if (data) {
      setSortedUsers((prevState) => mergeSortedArray<User>(data, prevState, USER_ID_KEY));
    }
  }, [data]);

  const handleFetchNextPage = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setSortedUsers((items) => {
        const oldIndex = items.findIndex(item => _get(item, USER_ID_KEY) === active.id);
        const newIndex = items.findIndex(item => _get(item, USER_ID_KEY) === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  if (status === 'pending') return <p>Loading...</p>;
  if (status === 'error') return <p>Error: {error.message}</p>;

  return (
    <SortableContextProvider
      items={sortedUsers}
      itemIdKey={USER_ID_KEY}
      onDragEnd={handleDragEnd}
    >
      <VirtualList
        items={sortedUsers}
        estimatedItemSize={ESTIMATED_USER_CARD_HEIGHT_PX}
        onReachEnd={handleFetchNextPage}
        renderVirtualItem={(virtualRow) => {
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
        }}
      />
    </SortableContextProvider>
  );
};

export default UserList;
