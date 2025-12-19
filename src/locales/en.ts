import type { TranslationsSchema } from './types';

export const en = {
  common: {
    skipToMain: 'Skip to main content',
    brand: 'YVG Frontend Assessment',
    brandSubtitle: 'Developed by Rietts Andreas Ruff',
    footer: '© {year} YVG - Frontend Engineer Assessment',
    refreshing: 'Refreshing',
    back: 'Back',
    retry: 'Retry',
    tryAgain: 'Try again',
    loading: 'Loading...',
    loadingAlt: 'Loading content, please wait',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    theme: {
      label: 'Toggle theme',
      light: 'light theme',
      dark: 'dark theme',
      toggle: 'Switch to {theme}',
      current: 'Current theme: {theme}',
    },
    language: {
      label: 'Language',
      current: 'Current language: {language}',
      en: 'English',
      id: 'Bahasa Indonesia',
      toggle: 'Switch language to {language}',
    },
  },

  nav: {
    todos: {
      label: 'Todos',
      description: 'Manage your tasks',
    },
    posts: {
      label: 'Posts',
      description: 'Browse articles',
    },
  },

  todos: {
    title: 'My Tasks',
    subtitle: '{completed} of {total} tasks completed',
    subtitleEmpty: 'No tasks yet. Add one to get started!',
    progressLabel: 'Task completion: {percent}%',
    addPlaceholder: 'What needs to be done?',
    addButton: 'Add Task',
    addHint: 'Enter a task description and press Add Task or Enter to create it',
    filters: {
      all: 'All',
      pending: 'Pending',
      completed: 'Completed',
    },
    emptyTitle: 'No tasks yet',
    emptyDescription: 'Create your first task above to get started',
    emptyFilterTitle: 'No matching tasks',
    emptyFilterDescription: 'No {filter} tasks found',
    countBadge: '{count}',
    keyboardHint: 'Click the circle to mark complete. Hover to reveal delete',
    deleteAria: 'Delete task: {text}',
    markComplete: 'Mark "{text}" as complete',
    markIncomplete: 'Mark "{text}" as incomplete',
  },

  posts: {
    title: 'Posts',
    description: 'Browse {count} posts or search by ID to view comments',
    searchLabel: 'Search posts by ID',
    searchPlaceholder: 'Search by post ID...',
    searchButton: 'Search',
    searchHint: 'Enter a number between {min}-{max} to find a specific post',
    emptyTitle: 'No posts found',
    emptyDescription: 'No posts available',
    emptySearchDescription: 'No posts with ID containing "{query}"',
    showingCount: 'Showing {limit} of {count} posts. Use search to find specific posts.',
    retryLoad: 'Retry loading posts',
    ariaPost: 'Post {id}: {title}. Click to view details and comments',
  },

  postDetail: {
    loading: 'Loading post...',
    invalidId: 'Invalid post id. Please select a valid post.',
    error: 'Failed to fetch post',
    notFoundTitle: 'Post not found',
    notFoundDescription: "We couldn't find the post you're looking for.",
    postLabel: 'Post #{id}',
    postHeaderLabel: 'Posts',
    comments: 'Comments',
    commentsCount: '({count})',
    loadingComments: 'Loading comments...',
    commentsEmptyTitle: 'No comments',
    commentsEmptyDescription: 'This post has no comments yet',
    commentLabel: 'Comment #{id}',
    back: 'Back',
  },

  notFoundPage: {
    title: 'Oops! Page not found',
    backHome: 'Return to Home',
  },

  errorState: {
    title: 'Something went wrong',
    retryAria: 'Retry the failed operation',
  },
} as const satisfies TranslationsSchema;

export default en;
