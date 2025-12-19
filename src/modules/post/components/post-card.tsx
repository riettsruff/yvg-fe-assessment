import { cn } from '@/utils/cn';

import { type Post } from '../model';

export interface PostCardProps {
  post: Post;
  index: number;
  ariaLabel: string;
  onSelect: () => void;
}

export const PostCard = ({ post, index, ariaLabel, onSelect }: PostCardProps) => (
  <li className="list-none">
    <button
      onClick={onSelect}
      className={cn(
        'w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-300 animate-slide-up group',
        'border-border/50 bg-card hover:border-primary/50 hover:bg-card/80 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary',
      )}
      style={{ animationDelay: `${index * 30}ms` }}
      aria-label={ariaLabel}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'flex-shrink-0 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors',
            'bg-primary/10 text-primary group-hover:bg-primary/20',
          )}
          aria-hidden="true"
        >
          #{post.id}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-sm md:text-base mb-1.5 capitalize line-clamp-1 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {post.body}
          </p>
        </div>
      </div>
    </button>
  </li>
);
