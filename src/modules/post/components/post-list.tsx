import { type Post } from '../model';
import { PostCard } from './post-card';

export interface PostListProps {
  posts: Post[];
  onSelect: (post: Post) => void;
  getAriaLabel: (post: Post) => string;
}

export const PostList = ({ posts, onSelect, getAriaLabel }: PostListProps) => (
  <ul className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2" aria-label="Posts">
    {posts.map((post, index) => (
      <PostCard
        key={post.id}
        post={post}
        index={index}
        onSelect={() => onSelect(post)}
        ariaLabel={getAriaLabel(post)}
      />
    ))}
  </ul>
);
