import { useQuery } from '@tanstack/react-query';

import { tmdbClient } from '../api/tmdbClient';
import { QUERY_KEYS } from '../constants/queryKeys';

import type { MoviesResponse } from '../types/movie';

export function useFetchMovies(
  page = 1,
  query = ''
) {
  const isSearch = query.trim().length > 0;

  return useQuery({
    queryKey: isSearch
      ? QUERY_KEYS.movies.search(query, page)
      : QUERY_KEYS.movies.popular(page),

    queryFn: async () => {
      const endpoint = isSearch
        ? '/search/movie'
        : '/movie/popular';

      const params: Record<string, string | number> = {
        page,
      };

      if (isSearch) {
        params.query = query;
      }

      const { data } =
        await tmdbClient.get<MoviesResponse>(
          endpoint,
          { params }
        );

      return data;
    },

    enabled:
      !isSearch || query.trim().length >= 2,

    placeholderData: (prev) => prev,

    staleTime: 1000 * 60 * 3,
  });
}