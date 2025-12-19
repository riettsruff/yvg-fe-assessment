import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import PostsPage, { PostsPage as NamedPostsPage } from '@/modules/post/pages/posts-page';

const mockUsePostsPageVM = jest.fn();
const mockNavigate = jest.fn();
let capturedPostSearchProps: any;
let capturedPostListProps: any;

jest.mock('@/modules/post/hooks', () => ({
  usePostsPageVM: () => mockUsePostsPageVM(),
}));

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

jest.mock('@/modules/post/components', () => {
  const PostSearch = (props: any) => {
    capturedPostSearchProps = props;
    return (
      <div data-testid="post-search" onClick={() => props.onSearch()}>
        {props.label}
      </div>
    );
  };

  const PostList = ({ posts, onSelect, getAriaLabel }: any) => {
    capturedPostListProps = { posts, onSelect, getAriaLabel };
    return (
      <div data-testid="post-list">
        {posts.map((post: any) => (
          <button key={post.id} aria-label={getAriaLabel(post)} onClick={() => onSelect(post)}>
            {post.title}
          </button>
        ))}
      </div>
    );
  };

  return {
    PostList,
    PostSearch,
    PostsSkeleton: ({ loadingLabel }: { loadingLabel: string }) => (
      <div data-testid="posts-skeleton">{loadingLabel}</div>
    ),
  };
});

jest.mock('@/contexts/locale-context', () => ({
  useI18n: () => ({
    t: (key: string, params?: Record<string, string | number>) => {
      if (typeof params?.count !== 'undefined') return `${key}-${params.count}`;
      if (typeof params?.limit !== 'undefined') return `${key}-${params.limit}`;
      if (typeof params?.query !== 'undefined') return `${key}-${params.query}`;
      if (typeof params?.min !== 'undefined') return `${key}-${params.min}-${params.max}`;
      return key;
    },
  }),
}));

const buildState = (overrides: Partial<ReturnType<typeof mockUsePostsPageVM>> = {}) => ({
  posts: [],
  filteredPosts: [],
  limitedPosts: [],
  pendingSearch: '',
  searchTerm: '',
  setPendingSearch: jest.fn(),
  handleSearch: jest.fn(),
  meta: {
    POST_ID_MIN: 1,
    POST_ID_MAX: 100,
    POSTS_DISPLAY_LIMIT: 2,
  },
  isLoading: false,
  isFetching: false,
  isError: false,
  error: undefined,
  refetch: jest.fn(),
  ...overrides,
});

describe('PostsPage', () => {
  beforeEach(() => {
    mockUsePostsPageVM.mockReset();
    mockNavigate.mockClear();
    capturedPostListProps = undefined;
    capturedPostSearchProps = undefined;
  });

  it('exports named and default components consistently', () => {
    expect(NamedPostsPage).toBe(PostsPage);
  });

  it('shows skeleton while loading', () => {
    mockUsePostsPageVM.mockReturnValue(buildState({ isLoading: true }));
    render(<PostsPage />);

    expect(screen.getByTestId('posts-skeleton')).toHaveTextContent('common.loading');
  });

  it('shows error state when initial load fails', () => {
    const refetch = jest.fn();
    const baseErrorState = buildState({
      isError: true,
      error: new Error('Failed to load'),
      refetch,
    });
    mockUsePostsPageVM.mockReturnValue(baseErrorState);

    const { rerender } = render(<PostsPage />);
    expect(screen.getByText('Failed to load')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'errorState.retryAria' }));
    expect(refetch).toHaveBeenCalled();

    mockUsePostsPageVM.mockReturnValue(
      buildState({
        isError: true,
        error: undefined,
        refetch,
      }),
    );
    rerender(<PostsPage />);
    expect(screen.getByText('posts.retryLoad')).toBeInTheDocument();
  });

  it('shows empty state when no filtered posts match search', () => {
    mockUsePostsPageVM.mockReturnValue(
      buildState({
        posts: [{ id: 1, userId: 1, title: 'A', body: 'B' }],
        filteredPosts: [],
        searchTerm: '42',
      }),
    );

    render(<PostsPage />);
    expect(screen.getByText('posts.emptySearchDescription-42')).toBeInTheDocument();
  });

  it('shows default empty description when no search term is provided', () => {
    mockUsePostsPageVM.mockReturnValue(
      buildState({
        posts: [{ id: 1, userId: 1, title: 'A', body: 'B' }],
        filteredPosts: [],
        searchTerm: '',
      }),
    );

    render(<PostsPage />);
    expect(screen.getByText('posts.emptyDescription')).toBeInTheDocument();
  });

  it('renders list, search, refresh badge, and retry control when data is present', () => {
    const refetch = jest.fn();
    const setPendingSearch = jest.fn();
    const handleSearch = jest.fn();
    const posts = [
      { id: 1, userId: 1, title: 'First', body: 'One' },
      { id: 2, userId: 1, title: 'Second', body: 'Two' },
      { id: 3, userId: 1, title: 'Third', body: 'Three' },
    ];

    mockUsePostsPageVM.mockReturnValue(
      buildState({
        posts,
        filteredPosts: posts,
        limitedPosts: posts.slice(0, 2),
        pendingSearch: '7',
        searchTerm: '',
        setPendingSearch,
        handleSearch,
        isFetching: true,
        isError: true,
        error: new Error('Minor issue'),
        refetch,
        meta: { POST_ID_MIN: 1, POST_ID_MAX: 100, POSTS_DISPLAY_LIMIT: 1 },
      }),
    );

    render(<PostsPage />);

    expect(screen.getByRole('heading', { name: 'posts.title', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('common.refreshing')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'posts.retryLoad' }));
    expect(refetch).toHaveBeenCalled();

    // PostList receives limited posts and navigates when selecting
    expect(capturedPostListProps.posts).toHaveLength(2);
    const secondButton = screen.getByText('Second');
    expect(secondButton).toHaveAttribute('aria-label', 'posts.ariaPost');
    fireEvent.click(secondButton);
    expect(mockNavigate).toHaveBeenCalledWith('/posts/2');

    // PostSearch wiring
    expect(capturedPostSearchProps.pendingSearch).toBe('7');
    capturedPostSearchProps.onChange('99');
    expect(setPendingSearch).toHaveBeenCalledWith('99');
    capturedPostSearchProps.onSearch();
    expect(handleSearch).toHaveBeenCalled();

    // Showing count message when filtered exceeds limit
    expect(screen.getByText('posts.showingCount-3')).toBeInTheDocument();
  });
});
