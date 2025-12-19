import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useNavigationType, useParams } from 'react-router-dom';

import { fetchCommentsByPostId, fetchPostById, postsKeys } from '../api';
import { type Comment, type Post } from '../model';

export const usePostDetailVM = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const numericId = Number(id);
  const invalidId = Number.isNaN(numericId) || numericId <= 0;

  useEffect(() => {
    if (navigationType === 'POP') return;
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [numericId, navigationType]);

  const postQuery = useQuery<Post, Error>({
    queryKey: postsKeys.detail(numericId),
    queryFn: () => fetchPostById(numericId),
    enabled: !invalidId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const commentsQuery = useQuery<Comment[], Error>({
    queryKey: postsKeys.comments(numericId),
    queryFn: () => fetchCommentsByPostId(numericId),
    enabled: !invalidId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/posts');
    }
  };

  const handleRetry = () => {
    if (invalidId) return;
    postQuery.refetch();
    commentsQuery.refetch();
  };

  const isRefreshing =
    (postQuery.isFetching && !postQuery.isLoading) ||
    (commentsQuery.isFetching && !commentsQuery.isLoading);

  return {
    numericId,
    invalidId,
    isRefreshing,
    postQuery,
    commentsQuery,
    handleBack,
    handleRetry,
  };
};
