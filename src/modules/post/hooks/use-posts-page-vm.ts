import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigationType, useSearchParams } from 'react-router-dom';

import { fetchPosts, postsKeys } from '../api';
import { type Post } from '../model';

const POST_ID_MIN = 1;
const POST_ID_MAX = 100;
const POSTS_DISPLAY_LIMIT = 20;

export const usePostsPageVM = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigationType = useNavigationType();
  const initialQuery = searchParams.get('q') ?? '';
  const [pendingSearch, setPendingSearch] = useState(initialQuery);
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const query = useQuery<Post[], Error>({
    queryKey: postsKeys.all,
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    setPendingSearch(q);
    setSearchTerm(q);
  }, [searchParams]);

  useEffect(() => {
    if (navigationType === 'POP') return;
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [navigationType]);

  const handleSearch = useCallback(() => {
    const trimmed = pendingSearch.trim();
    setSearchTerm(trimmed);
    setSearchParams(trimmed ? { q: trimmed } : {});
  }, [pendingSearch, setSearchParams]);

  const filteredPosts = useMemo(
    () =>
      searchTerm
        ? (query.data ?? []).filter((p) => p.id.toString().includes(searchTerm))
        : (query.data ?? []),
    [query.data, searchTerm],
  );

  const limitedPosts = useMemo(() => filteredPosts.slice(0, POSTS_DISPLAY_LIMIT), [filteredPosts]);

  return {
    searchTerm,
    pendingSearch,
    setPendingSearch,
    handleSearch,
    posts: query.data ?? [],
    filteredPosts,
    limitedPosts,
    meta: { POST_ID_MIN, POST_ID_MAX, POSTS_DISPLAY_LIMIT },
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
