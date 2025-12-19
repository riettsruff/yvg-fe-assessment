import { LoadingState } from '@/components/loading-state';

export interface PostsSkeletonProps {
  loadingLabel: string;
}

export const PostsSkeleton = ({ loadingLabel }: PostsSkeletonProps) => (
  <div className="max-w-4xl mx-auto">
    <header className="mb-8 md:mb-10">
      <div className="h-8 w-64 bg-muted rounded-lg animate-pulse mb-3" aria-hidden="true" />
      <div className="flex items-center gap-3">
        <div className="h-5 w-80 bg-muted rounded-md animate-pulse" aria-hidden="true" />
        <span className="h-5 w-20 bg-muted rounded-full animate-pulse" aria-hidden="true" />
      </div>
    </header>

    <div className="mb-8" aria-hidden="true">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 h-12 md:h-14 bg-muted rounded-xl animate-pulse" />
        <div className="h-12 md:h-14 w-36 md:w-44 bg-muted rounded-xl animate-pulse" />
      </div>
      <div className="h-3 w-52 bg-muted rounded mt-2 animate-pulse" />
    </div>

    <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="p-4 md:p-5 rounded-xl border border-border/40 bg-card animate-pulse"
        >
          <div className="flex items-start gap-3 mb-3">
            <span className="h-7 w-12 rounded-lg bg-muted block" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-3/4 rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted/80" />
              <div className="h-4 w-5/6 rounded bg-muted/70" />
              <div className="h-4 w-3/4 rounded bg-muted/60" />
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="sr-only" role="status" aria-live="polite">
      <LoadingState message={loadingLabel} />
    </div>
  </div>
);

export default PostsSkeleton;
