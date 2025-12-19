import { ArrowLeft, FileText, Loader2, MessageSquare } from 'lucide-react';

import { Button } from '@/components/core/button';
import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { useI18n } from '@/contexts/locale-context';
import {
  CommentsEmptyIllustration,
  CommentsList,
  CommentsSkeleton,
  PostDetailSkeleton,
} from '@/modules/post/components';
import { usePostDetailVM } from '@/modules/post/hooks';

const PostDetailPage = () => {
  const { t } = useI18n();
  const { invalidId, isRefreshing, postQuery, commentsQuery, handleBack, handleRetry } =
    usePostDetailVM();
  const containerClassName = 'max-w-4xl w-full mx-auto';

  const selectedPost = postQuery.data;
  const comments = commentsQuery.data ?? [];

  if (invalidId) {
    return (
      <div className={containerClassName}>
        <ErrorState message={t('postDetail.invalidId')} onRetry={() => handleBack()} />
      </div>
    );
  }

  if (postQuery.isLoading) {
    return (
      <div className={containerClassName}>
        <PostDetailSkeleton loadingLabel={t('postDetail.loading')} />
      </div>
    );
  }

  if (postQuery.isError) {
    return (
      <div className={containerClassName}>
        <ErrorState
          message={(postQuery.error as Error | undefined)?.message || t('postDetail.error')}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  if (!selectedPost) {
    return (
      <div className={containerClassName}>
        <EmptyState
          icon={<MessageSquare className="h-10 w-10 text-muted-foreground/50" />}
          title={t('postDetail.notFoundTitle')}
          description={t('postDetail.notFoundDescription')}
        />
      </div>
    );
  }

  const renderComments = () => {
    if (commentsQuery.isLoading) {
      return <CommentsSkeleton loadingLabel={t('postDetail.loadingComments')} />;
    }

    if (commentsQuery.isError) {
      return (
        <ErrorState
          message={
            (commentsQuery.error as Error | undefined)?.message || t('postDetail.loadingComments')
          }
          onRetry={commentsQuery.refetch}
        />
      );
    }

    if (comments.length === 0) {
      return (
        <EmptyState
          icon={<CommentsEmptyIllustration />}
          title={t('postDetail.commentsEmptyTitle')}
          description={t('postDetail.commentsEmptyDescription')}
        />
      );
    }

    return (
      <CommentsList
        comments={comments}
        label={t('postDetail.comments')}
        getCommentLabel={(comment) => t('postDetail.commentLabel', { id: comment.id })}
      />
    );
  };

  return (
    <div className={`${containerClassName} space-y-4`}>
      <article
        className="p-6 md:p-8 rounded-2xl border border-border/50 bg-card animate-scale-in"
        aria-labelledby={`post-title-${selectedPost.id}`}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-5">
          <div className="flex w-full items-start gap-4 md:flex-1 md:min-w-0">
            <div
              className="hidden md:flex h-12 w-12 rounded-xl bg-gradient-primary/20 border border-primary/30 items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0 w-full">
              <span className="text-xs text-primary font-medium">
                {t('postDetail.postLabel', { id: selectedPost.id })}
              </span>
              <h1
                id={`post-title-${selectedPost.id}`}
                className="font-semibold text-xl md:text-2xl capitalize leading-tight"
              >
                {selectedPost.title}
              </h1>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {selectedPost.body}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start">
            {isRefreshing && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full border border-border/50">
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                {t('common.refreshing')}
              </span>
            )}
            <Button
              variant="secondary"
              size="sm"
              className="gap-2"
              onClick={handleBack}
              aria-label={t('common.back')}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t('common.back')}
            </Button>
          </div>
        </div>

        <section className="border-t border-border/50 pt-6 mt-6" aria-labelledby="comments-heading">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 id="comments-heading" className="font-semibold text-lg">
              {t('postDetail.comments')}
            </h2>
            {comments.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                {t('postDetail.commentsCount', { count: comments.length })}
              </span>
            )}
          </div>

          {renderComments()}
        </section>
      </article>
    </div>
  );
};

export default PostDetailPage;
