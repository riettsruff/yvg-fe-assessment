import { MessageSquare, User } from 'lucide-react';

import { type Comment } from '../model';

export interface CommentsListProps {
  comments: Comment[];
  label: string;
  getCommentLabel: (comment: Comment) => string;
}

export const CommentsList = ({ comments, label, getCommentLabel }: CommentsListProps) => (
  <ul className="space-y-4" aria-label={label}>
    {comments.map((comment, index) => (
      <li
        key={comment.id}
        className="p-4 md:p-5 rounded-xl bg-secondary/50 border border-border/30 animate-slide-up"
        style={{ animationDelay: `${index * 75}ms` }}
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <User className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-col gap-1 min-w-0">
              <span className="font-medium text-sm text-foreground truncate block min-w-0 leading-5">
                {comment.name}
              </span>
              <div className="text-xs text-muted-foreground flex items-center gap-2 min-w-0 leading-5">
                <span className="break-words">{comment.email}</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{comment.body}</p>
      </li>
    ))}
  </ul>
);

export const CommentsEmptyIllustration = () => (
  <MessageSquare className="h-10 w-10 text-muted-foreground/50" aria-hidden="true" />
);
