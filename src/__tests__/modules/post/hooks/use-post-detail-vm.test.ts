import { act, renderHook } from '@testing-library/react';

import { usePostDetailVM } from '@/modules/post/hooks/use-post-detail-vm';

const mockUseQuery = jest.fn();
const mockNavigate = jest.fn();
let mockParams: { id?: string } = { id: '5' };
let navigationType: 'POP' | 'PUSH' | 'REPLACE' = 'PUSH';
type MockQueryConfig = { queryKey: unknown[]; queryFn: () => unknown; enabled?: boolean };

jest.mock('@tanstack/react-query', () => ({
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
}));

jest.mock('react-router-dom', () => ({
  useParams: () => mockParams,
  useNavigate: () => mockNavigate,
  useNavigationType: () => navigationType,
}));

jest.mock('@/modules/post/api', () => {
  const mockFetchPostById = jest.fn();
  const mockFetchCommentsByPostId = jest.fn();
  const mockPostsKeys = {
    detail: jest.fn((id: number) => ['posts', 'detail', id]),
    comments: jest.fn((id: number) => ['posts', 'comments', id]),
  };

  return {
    fetchPostById: mockFetchPostById,
    fetchCommentsByPostId: mockFetchCommentsByPostId,
    postsKeys: mockPostsKeys,
    __mocks: { mockFetchPostById, mockFetchCommentsByPostId, mockPostsKeys },
  };
});

const {
  __mocks: { mockFetchPostById, mockFetchCommentsByPostId, mockPostsKeys },
} = jest.requireMock('@/modules/post/api') as {
  __mocks: {
    mockFetchPostById: jest.Mock;
    mockFetchCommentsByPostId: jest.Mock;
    mockPostsKeys: { detail: jest.Mock; comments: jest.Mock };
  };
};

const createPostQuery = () => ({
  data: { id: 5, userId: 1, title: 'Title', body: 'Body' },
  isLoading: false,
  isFetching: true,
  isError: false,
  error: undefined,
  refetch: jest.fn(),
});

const createCommentsQuery = () => ({
  data: [],
  isLoading: false,
  isFetching: false,
  isError: false,
  error: undefined,
  refetch: jest.fn(),
});

const originalHistory = window.history;

describe('usePostDetailVM', () => {
  beforeEach(() => {
    mockUseQuery.mockReset();
    mockNavigate.mockReset();
    mockFetchPostById.mockReset();
    mockFetchCommentsByPostId.mockReset();
    mockPostsKeys.detail.mockClear();
    mockPostsKeys.comments.mockClear();
    mockParams = { id: '5' };
    navigationType = 'PUSH';
    window.scrollTo = jest.fn();
    mockFetchPostById.mockResolvedValue(createPostQuery().data);
    mockFetchCommentsByPostId.mockResolvedValue(createCommentsQuery().data);
  });

  afterEach(() => {
    jest.resetModules();
    Object.defineProperty(window, 'history', { value: originalHistory });
  });

  it('returns queries, refreshing state, and handles navigation with history present', () => {
    const postQuery = createPostQuery();
    const commentsQuery = createCommentsQuery();

    mockUseQuery.mockImplementation((config: MockQueryConfig) => {
      if (config.enabled !== false) {
        const maybePromise = config.queryFn();
        if (maybePromise instanceof Promise) {
          maybePromise.catch(() => {});
        }
      }
      return (config.queryKey as string[]).includes('comments') ? commentsQuery : postQuery;
    });

    Object.defineProperty(window, 'history', {
      configurable: true,
      value: { length: 2 },
    });

    const { result } = renderHook(() => usePostDetailVM());

    expect(result.current.numericId).toBe(5);
    expect(result.current.invalidId).toBe(false);
    expect(result.current.isRefreshing).toBe(true);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
    expect(mockFetchPostById).toHaveBeenCalledWith(5);
    expect(mockFetchCommentsByPostId).toHaveBeenCalledWith(5);

    act(() => result.current.handleRetry());

    expect(postQuery.refetch).toHaveBeenCalled();
    expect(commentsQuery.refetch).toHaveBeenCalled();

    act(() => result.current.handleBack());

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('handles invalid ids, avoids retries, and navigates to posts when history is short', () => {
    const postQuery = {
      ...createPostQuery(),
      isFetching: false,
      isLoading: false,
    };
    const commentsQuery = {
      ...createCommentsQuery(),
      isFetching: true,
      isLoading: false,
    };

    mockParams = { id: 'invalid' };
    navigationType = 'POP';
    mockUseQuery.mockImplementation((config: MockQueryConfig) => {
      if (config.enabled !== false) {
        config.queryFn();
      }
      return (config.queryKey as string[]).includes('comments') ? commentsQuery : postQuery;
    });

    Object.defineProperty(window, 'history', {
      configurable: true,
      value: { length: 1 },
    });

    const { result } = renderHook(() => usePostDetailVM());

    expect(result.current.numericId).toBeNaN();
    expect(result.current.invalidId).toBe(true);
    expect(result.current.isRefreshing).toBe(true);
    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(mockFetchPostById).not.toHaveBeenCalled();
    expect(mockFetchCommentsByPostId).not.toHaveBeenCalled();

    act(() => result.current.handleRetry());

    expect(postQuery.refetch).not.toHaveBeenCalled();
    expect(commentsQuery.refetch).not.toHaveBeenCalled();

    act(() => result.current.handleBack());

    expect(mockNavigate).toHaveBeenCalledWith('/posts');
  });
});
