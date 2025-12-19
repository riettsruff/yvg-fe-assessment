import { fireEvent, render, screen } from '@testing-library/react';

import { PostCard } from '@/modules/post/components/post-card';

describe('PostCard', () => {
  const post = { userId: 1, id: 10, title: 'hello world', body: 'body content' };

  it('renders post content and calls onSelect', () => {
    const onSelect = jest.fn();
    render(<PostCard post={post} index={2} ariaLabel="Select post" onSelect={onSelect} />);

    const button = screen.getByRole('button', { name: 'Select post' });
    expect(button.style.animationDelay).toBe('60ms');
    expect(screen.getByText('#10')).toBeInTheDocument();
    expect(screen.getByText('hello world')).toBeInTheDocument();
    expect(screen.getByText('body content')).toBeInTheDocument();

    fireEvent.click(button);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
