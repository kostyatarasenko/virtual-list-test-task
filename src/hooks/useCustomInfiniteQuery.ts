import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { getJson } from '../api';

interface UseCustomInfiniteQueryProps {
  queryKey: QueryKey;
  limit?: number;
  resultsPerPage?: number;
}

const useCustomInfiniteQuery = ({
  queryKey,
  limit = 1000,
  resultsPerPage = 30,
}: UseCustomInfiniteQueryProps) => {
  const handleFetchPage = async ({ pageParam = 1 }: { pageParam?: number }) => {
    const response = await getJson('', { page: pageParam, results: resultsPerPage });
    return response.json();
  };

  return useInfiniteQuery({
    queryKey,
    queryFn: handleFetchPage,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length * resultsPerPage < limit) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1,
    select: (data) => {
      return data.pages.flatMap(page => page.results);
    },
  });
};

export default useCustomInfiniteQuery;
