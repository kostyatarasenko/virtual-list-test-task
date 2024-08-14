import React from 'react';

import { useCustomInfiniteQuery, useBottomScrollListener } from '../../hooks';

const UserList = () => {
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
  });

  if (status === 'pending') return <p>Loading...</p>;
  if (status === 'error') return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.pages.map((page, index) => (
        <div key={index}>
          {page.results.map((user: any) => (
            <p key={user.login.uuid}>{user.name.first} {user.name.last}</p>
          ))}
        </div>
      ))}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'
        }
      </button>
    </div>
  );
}

export default UserList;
