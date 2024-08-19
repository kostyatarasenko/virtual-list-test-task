import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';

import api, { RequestParams } from '../api';

interface UseCustomInfiniteQueryProps {
  queryKey: string[];
  route: string;
  limit?: number;
  resultsPerPage?: number;
  params?: RequestParams;
}

// Typical response from the API for paginated requests
interface FetchItemsResponse<T> {
  results: T[];
  nextPage?: number;
}

const usePaginatedQuery = <T>({
  queryKey,
  limit = 1000,
  resultsPerPage = 30,
  route,
  params,
}: UseCustomInfiniteQueryProps) => {
  const handleFetchPage = async ({ pageParam = 1 }: QueryFunctionContext): Promise<FetchItemsResponse<T>> => {
    const defaultParams = { page: pageParam, results: resultsPerPage };

    const response = await api.get(route, params || defaultParams);
    return response.json();
  };

  return useInfiniteQuery<FetchItemsResponse<T>, Error, T[]>({
    queryKey,
    queryFn: handleFetchPage,
    getNextPageParam: (_lastPage, pages) => {
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
