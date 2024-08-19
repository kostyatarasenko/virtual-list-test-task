import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import api from '../api';

type UseCustomInfiniteQueryProps = {
  queryKey: QueryKey;
  route: string;
  params?: Record<string, string | number>;
  limit?: number;
  resultsPerPage?: number;
}

const usePaginatedQuery = ({
  queryKey,
  limit = 1000,
  resultsPerPage = 30,
  route,
  params,
}: UseCustomInfiniteQueryProps) => {
  const handleFetchPage = async ({ pageParam = 1 }: { pageParam: number }) => {
    const defaultParams = { page: pageParam, results: resultsPerPage };

    const response = await api.get(route, params || defaultParams);
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

export default usePaginatedQuery;
