export interface PostDetailSkeletonProps {
  loadingLabel: string;
}

export const PostDetailSkeleton = ({ loadingLabel }: PostDetailSkeletonProps) => (
  <div className="max-w-4xl w-full mx-auto">
    <article className="p-6 md:p-8 rounded-2xl border border-border/50 bg-card animate-scale-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-6">
        <div className="flex items-start gap-4 w-full">
          <div className="h-12 w-12 rounded-xl bg-muted animate-pulse" aria-hidden="true" />
          <div className="space-y-2 w-full max-w-2xl">
            <div className="h-4 w-28 rounded bg-muted animate-pulse" aria-hidden="true" />
            <div className="h-6 w-3/4 rounded bg-muted animate-pulse" aria-hidden="true" />
            <div className="h-4 w-full rounded bg-muted/90 animate-pulse" aria-hidden="true" />
            <div className="h-4 w-5/6 rounded bg-muted/80 animate-pulse" aria-hidden="true" />
          </div>
        </div>
        <div className="flex items-center gap-2 self-start">
          <span className="h-9 w-24 md:w-28 rounded-lg bg-muted animate-pulse" aria-hidden="true" />
        </div>
      </div>

      <section className="border-t border-border/50 pt-6 mt-2" aria-hidden="true">
        <div className="flex items-center gap-2 mb-5">
          <span className="h-5 w-5 rounded-full bg-muted animate-pulse" />
          <span className="h-5 w-24 rounded bg-muted animate-pulse" />
          <span className="h-5 w-10 rounded-full bg-muted animate-pulse" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="p-4 md:p-5 rounded-xl border border-border/40 bg-secondary/50 animate-pulse space-y-3"
            >
              <div className="flex items-start gap-3">
                <span className="h-10 w-10 rounded-full bg-muted block" />
                <div className="space-y-2 w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="h-4 w-28 rounded bg-muted" />
                    <span className="h-3.5 w-40 rounded bg-muted/80" />
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
        </div>
      </section>

      <div className="sr-only" role="status" aria-live="polite">
        {loadingLabel}
      </div>
    </article>
  </div>
);

export default PostDetailSkeleton;
