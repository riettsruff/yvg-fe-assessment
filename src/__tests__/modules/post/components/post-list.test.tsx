import { fireEvent, render, screen } from '@testing-library/react';

import { PostList } from '@/modules/post/components/post-list';

describe('PostList', () => {
  const posts = [
    { userId: 1, id: 1, title: 'First', body: 'First body' },
    { userId: 1, id: 2, title: 'Second', body: 'Second body' },
  ];

  it('renders posts and wires selection callbacks', () => {
    const onSelect = jest.fn();
    const getAriaLabel = jest.fn((post) => `Post ${post.id}`);

    render(<PostList posts={posts} onSelect={onSelect} getAriaLabel={getAriaLabel} />);

    expect(screen.getByRole('list', { name: 'Posts' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Post 2' }));

    expect(onSelect).toHaveBeenCalledWith(posts[1]);
    expect(getAriaLabel).toHaveBeenCalledTimes(posts.length);
  });
});
