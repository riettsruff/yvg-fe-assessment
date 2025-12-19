import { render, screen } from '@testing-library/react';

import PostDetailSkeleton, {
  PostDetailSkeleton as PostDetailSkeletonNamed,
} from '@/modules/post/components/post-detail-skeleton';

describe('PostDetailSkeleton', () => {
  it('renders article placeholders and accessible loading label', () => {
    const { container } = render(<PostDetailSkeleton loadingLabel="Loading post detail" />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading post detail');
    const pulses = container.querySelectorAll('.animate-pulse');
    expect(pulses.length).toBeGreaterThan(0);
    const commentSkeletons = container.querySelectorAll('[aria-hidden="true"] .p-4');
    expect(commentSkeletons).toHaveLength(2);
  });

  it('exports default and named components consistently', () => {
    expect(PostDetailSkeletonNamed).toBe(PostDetailSkeleton);
  });
});
