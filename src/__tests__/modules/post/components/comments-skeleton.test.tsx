import { render, screen } from '@testing-library/react';

import CommentsSkeleton, {
  CommentsSkeleton as CommentsSkeletonNamed,
} from '@/modules/post/components/comments-skeleton';

describe('CommentsSkeleton', () => {
  it('renders loading placeholders and screen-reader label', () => {
    const { container } = render(<CommentsSkeleton loadingLabel="Loading comments" />);

    const skeletonWrapper = container.querySelector('[aria-hidden="true"]');
    expect(skeletonWrapper).toBeInTheDocument();
    expect(skeletonWrapper?.querySelectorAll('.p-4')).toHaveLength(2);
    expect(screen.getByRole('status', { hidden: true })).toHaveTextContent('Loading comments');
  });

  it('exports default and named components consistently', () => {
    expect(CommentsSkeletonNamed).toBe(CommentsSkeleton);
  });
});
