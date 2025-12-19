import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import PostDetailPage from '@/modules/post/pages/post-detail-page';

const mockUsePostDetailVM = jest.fn();

jest.mock('@/modules/post/hooks', () => ({
  usePostDetailVM: () => mockUsePostDetailVM(),
}));

jest.mock('@/modules/post/components', () => ({
  CommentsEmptyIllustration: () => <div data-testid="comments-empty-icon" />,
  CommentsList: ({
    comments,
    getCommentLabel,
    label,
  }: {
    comments: Array<{ id: number }>;
    getCommentLabel: (comment: { id: number }) => string;
    label: string;
  }) => (
    <div data-testid="comments-list">
      <div>{label}</div>
      {comments.map((comment) => (
        <span key={comment.id}>{getCommentLabel(comment)}</span>
      ))}
      {comments.length} comments
    </div>
  ),
  CommentsSkeleton: ({ loadingLabel }: { loadingLabel: string }) => (
    <div data-testid="comments-skeleton">{loadingLabel}</div>
  ),
  PostDetailSkeleton: ({ loadingLabel }: { loadingLabel: string }) => (
    <div data-testid="post-skeleton">{loadingLabel}</div>
  ),
}));

jest.mock('@/contexts/locale-context', () => ({
  useI18n: () => ({
    t: (key: string, params?: Record<string, string | number>) =>
      typeof params?.id !== 'undefined' ? `${key}-${params.id}` : key,
  }),
}));

const basePost = { id: 1, userId: 1, title: 'title', body: 'body' };

const buildState = (overrides: Partial<ReturnType<typeof mockUsePostDetailVM>> = {}) => ({
  invalidId: false,
  isRefreshing: false,
  handleBack: jest.fn(),
  handleRetry: jest.fn(),
  postQuery: {
    data: basePost,
    isLoading: false,
    isError: false,
    error: undefined,
  },
  commentsQuery: {
    data: [{ id: 1 }],
    isLoading: false,
    isError: false,
    error: undefined,
    refetch: jest.fn(),
  },
  ...overrides,
});

describe('PostDetailPage', () => {
  beforeEach(() => {
    mockUsePostDetailVM.mockReset();
  });

  it('shows invalid id error and retries via back handler', () => {
    const handleBack = jest.fn();
    mockUsePostDetailVM.mockReturnValue(
      buildState({
        invalidId: true,
        handleBack,
        postQuery: { data: undefined, isLoading: false, isError: false, error: undefined },
      }),
    );

    render(<PostDetailPage />);
    expect(screen.getByText('postDetail.invalidId')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'errorState.retryAria' }));
    expect(handleBack).toHaveBeenCalled();
  });

  it('renders loading skeleton while post is loading', () => {
    mockUsePostDetailVM.mockReturnValue(
      buildState({
        postQuery: { data: undefined, isLoading: true, isError: false, error: undefined },
      }),
    );

    render(<PostDetailPage />);
    expect(screen.getByTestId('post-skeleton')).toHaveTextContent('postDetail.loading');
  });

  it('renders error state when post query fails', () => {
    const handleRetry = jest.fn();
    const baseErrorState = buildState({
      handleRetry,
      postQuery: {
        data: undefined,
        isLoading: false,
        isError: true,
        error: new Error('Network fail'),
      },
    });
    mockUsePostDetailVM.mockReturnValue(baseErrorState);

    const { rerender } = render(<PostDetailPage />);
    expect(screen.getByText('Network fail')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'errorState.retryAria' }));
    expect(handleRetry).toHaveBeenCalled();

    mockUsePostDetailVM.mockReturnValue(
      buildState({
        postQuery: {
          data: undefined,
          isLoading: false,
          isError: true,
          error: undefined,
        },
      }),
    );
    rerender(<PostDetailPage />);
    expect(screen.getByText('postDetail.error')).toBeInTheDocument();
  });

  it('renders empty state when no post is selected', () => {
    mockUsePostDetailVM.mockReturnValue(
      buildState({
        postQuery: { data: undefined, isLoading: false, isError: false, error: undefined },
      }),
    );

    render(<PostDetailPage />);
    expect(screen.getByText('postDetail.notFoundTitle')).toBeInTheDocument();
  });

  it('renders post detail with comment list, refresh badge, and back action', () => {
    const handleBack = jest.fn();
    mockUsePostDetailVM.mockReturnValue(
      buildState({
        isRefreshing: true,
        handleBack,
        commentsQuery: {
          data: [{ id: 3 }],
          isLoading: false,
          isError: false,
          error: undefined,
          refetch: jest.fn(),
        },
      }),
    );

    render(<PostDetailPage />);

    expect(screen.getByText('postDetail.postLabel-1')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('common.refreshing')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'common.back' }));
    expect(handleBack).toHaveBeenCalled();
    expect(screen.getByTestId('comments-list')).toHaveTextContent('1 comments');
  });

  it('renders comment skeleton and errors depending on query state', () => {
    // Loading comments
    mockUsePostDetailVM.mockReturnValue(
      buildState({
        commentsQuery: {
          data: undefined,
          isLoading: true,
          isError: false,
          error: undefined,
          refetch: jest.fn(),
        },
      }),
    );
    const { rerender } = render(<PostDetailPage />);
    expect(screen.getByTestId('comments-skeleton')).toHaveTextContent('postDetail.loadingComments');

    // Error loading comments
    const refetch = jest.fn();
    mockUsePostDetailVM.mockReturnValue(
      buildState({
        commentsQuery: {
          data: undefined,
          isLoading: false,
          isError: true,
          error: new Error('Failed comments'),
          refetch,
        },
      }),
    );
    rerender(<PostDetailPage />);
    expect(screen.getByText('Failed comments')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'errorState.retryAria' }));
    expect(refetch).toHaveBeenCalled();

    mockUsePostDetailVM.mockReturnValue(
      buildState({
        commentsQuery: {
          data: undefined,
          isLoading: false,
          isError: true,
          error: undefined,
          refetch,
        },
      }),
    );
    rerender(<PostDetailPage />);
    expect(screen.getByText('postDetail.loadingComments')).toBeInTheDocument();

    // Empty comments
    mockUsePostDetailVM.mockReturnValue(
      buildState({
        commentsQuery: {
          data: [],
          isLoading: false,
          isError: false,
          error: undefined,
          refetch: jest.fn(),
        },
      }),
    );
    rerender(<PostDetailPage />);
    expect(screen.getByText('postDetail.commentsEmptyTitle')).toBeInTheDocument();
    expect(screen.getByTestId('comments-empty-icon')).toBeInTheDocument();
  });
});
