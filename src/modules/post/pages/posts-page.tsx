import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/core/button';
import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { useI18n } from '@/contexts/locale-context';
import { PostList, PostSearch, PostsSkeleton } from '@/modules/post/components';
import { usePostsPageVM } from '@/modules/post/hooks';

export const PostsPage = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const containerClassName = 'max-w-4xl w-full mx-auto';
  const {
    posts,
    filteredPosts,
    limitedPosts,
    pendingSearch,
    searchTerm,
    setPendingSearch,
    handleSearch,
    meta,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = usePostsPageVM();

  if (isLoading) {
    return (
      <div className={containerClassName}>
        <PostsSkeleton loadingLabel={t('common.loading')} />
      </div>
    );
  }

  if (isError && posts.length === 0) {
    return (
      <div className={containerClassName}>
        <ErrorState message={error?.message || t('posts.retryLoad')} onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <header className="mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
          {t('posts.title')}
        </h1>
        <div className="flex items-center gap-3 text-muted-foreground text-base md:text-lg">
          <p>{t('posts.description', { count: posts.length })}</p>
          {isFetching && (
            <span className="text-sm px-2 py-1 rounded-full bg-secondary text-muted-foreground border border-border/50">
              {t('common.refreshing')}
            </span>
          )}
          {isError && posts.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              className="text-destructive hover:text-destructive"
              aria-label={t('posts.retryLoad')}
            >
              {t('common.retry')}
            </Button>
          )}
        </div>
      </header>

      <PostSearch
        pendingSearch={pendingSearch}
        onChange={setPendingSearch}
        onSearch={handleSearch}
        label={t('posts.searchLabel')}
        placeholder={t('posts.searchPlaceholder')}
        hint={t('posts.searchHint', { min: meta.POST_ID_MIN, max: meta.POST_ID_MAX })}
        buttonLabel={t('posts.searchButton')}
      />

      <section aria-labelledby="posts-list-heading">
        <h2 id="posts-list-heading" className="sr-only">
          {t('posts.title')}
        </h2>
        {filteredPosts.length === 0 ? (
          <EmptyState
            icon={<FileText className="h-10 w-10 text-muted-foreground/50" />}
            title={t('posts.emptyTitle')}
            description={
              searchTerm
                ? t('posts.emptySearchDescription', { query: searchTerm.trim() })
                : t('posts.emptyDescription')
            }
          />
        ) : (
          <>
            <PostList
              posts={limitedPosts}
              onSelect={(post) => navigate(`/posts/${post.id}`)}
              getAriaLabel={(post) => t('posts.ariaPost', { id: post.id, title: post.title })}
            />
            {filteredPosts.length > meta.POSTS_DISPLAY_LIMIT && (
              <p className="text-center text-muted-foreground text-sm py-6 mt-4">
                {t('posts.showingCount', {
                  limit: meta.POSTS_DISPLAY_LIMIT,
                  count: filteredPosts.length,
                })}
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default PostsPage;
