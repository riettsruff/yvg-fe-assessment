import { act, renderHook } from '@testing-library/react';

import { usePostsPageVM } from '@/modules/post/hooks/use-posts-page-vm';

const mockUseQuery = jest.fn();
const mockSetSearchParams = jest.fn();
let mockSearchParamValue = '';
let navigationType: 'POP' | 'PUSH' | 'REPLACE' = 'PUSH';
const searchParams = {
  get: jest.fn(() => mockSearchParamValue),
};

jest.mock('@tanstack/react-query', () => ({
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
}));

jest.mock('react-router-dom', () => ({
  useSearchParams: () => {
    return [searchParams, mockSetSearchParams] as const;
  },
  useNavigationType: () => navigationType,
}));

const buildPosts = () =>
  Array.from({ length: 25 }).map((_, index) => ({
    userId: 1,
    id: index + 1,
    title: `Post ${index + 1}`,
    body: 'Body',
  }));

describe('usePostsPageVM', () => {
  beforeEach(() => {
    mockSetSearchParams.mockClear();
    mockUseQuery.mockReset();
    mockSearchParamValue = '';
    navigationType = 'PUSH';
    searchParams.get = jest.fn(() => mockSearchParamValue);
    window.scrollTo = jest.fn();
    mockUseQuery.mockReturnValue({
      data: buildPosts(),
      isLoading: false,
      isFetching: false,
      isError: false,
      error: undefined,
      refetch: jest.fn(),
    });
  });

  it('initializes from search params, filters, and trims search input on submit', () => {
    mockSearchParamValue = '2';
    const { result } = renderHook(() => usePostsPageVM());

    expect(result.current.searchTerm).toBe('2');
    expect(result.current.pendingSearch).toBe('2');
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
    expect(result.current.filteredPosts.every((p) => p.id.toString().includes('2'))).toBe(true);

    act(() => result.current.setPendingSearch(' 3 '));
    act(() => result.current.handleSearch());

    expect(mockSetSearchParams).toHaveBeenCalledWith({ q: '3' });
    expect(result.current.searchTerm).toBe('3');
  });

  it('respects navigation type POP and limits the number of displayed posts', () => {
    navigationType = 'POP';
    const { result } = renderHook(() => usePostsPageVM());

    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(result.current.limitedPosts).toHaveLength(20);
    expect(result.current.meta).toEqual({
      POST_ID_MIN: 1,
      POST_ID_MAX: 100,
      POSTS_DISPLAY_LIMIT: 20,
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
  });
});
