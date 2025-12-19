export interface CommentsSkeletonProps {
  loadingLabel: string;
}

export const CommentsSkeleton = ({ loadingLabel }: CommentsSkeletonProps) => (
  <div aria-hidden="true" className="space-y-3">
    {Array.from({ length: 2 }).map((_, index) => (
      <div
        key={index}
        className="p-4 md:p-5 rounded-xl bg-secondary/40 border border-border/40 animate-pulse space-y-3"
      >
        <div className="flex items-start gap-3">
          <span className="h-10 w-10 rounded-full bg-muted block" />
          <div className="space-y-2 w-full">
            <div className="flex flex-wrap items-center gap-2">
              <span className="h-4 w-28 rounded bg-muted" />
              <span className="h-3.5 w-36 rounded bg-muted/80" />
            </div>
            <div className="h-3 w-20 rounded bg-muted/70" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-muted/80" />
          <div className="h-3 w-5/6 rounded bg-muted/70" />
        </div>
      </div>
    ))}
    <span className="sr-only" role="status" aria-live="polite">
      {loadingLabel}
    </span>
  </div>
);

export default CommentsSkeleton;
