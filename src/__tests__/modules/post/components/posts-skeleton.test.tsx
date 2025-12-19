import { render, screen } from '@testing-library/react';

import PostsSkeleton, {
  PostsSkeleton as PostsSkeletonNamed,
} from '@/modules/post/components/posts-skeleton';

jest.mock('@/contexts/locale-context', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe('PostsSkeleton', () => {
  it('renders list placeholders and loading message', () => {
    const { container } = render(<PostsSkeleton loadingLabel="Loading posts" />);

    const cards = container.querySelectorAll('[aria-hidden="true"] .p-4');
    expect(cards).toHaveLength(6);

    const statuses = screen.getAllByRole('status', { hidden: true });
    expect(statuses.some((el) => el.textContent?.includes('Loading posts'))).toBe(true);
    statuses.forEach((el) => expect(el).toHaveAttribute('aria-live', 'polite'));
  });

  it('exports default and named components consistently', () => {
    expect(PostsSkeletonNamed).toBe(PostsSkeleton);
  });
});
