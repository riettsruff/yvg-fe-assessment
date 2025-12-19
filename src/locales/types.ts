export type TranslationsSchema = {
  common: {
    skipToMain: string;
    brand: string;
    brandSubtitle: string;
    footer: string;
    refreshing: string;
    back: string;
    retry: string;
    tryAgain: string;
    loading: string;
    loadingAlt: string;
    openMenu: string;
    closeMenu: string;
    theme: {
      label: string;
      light: string;
      dark: string;
      toggle: string;
      current: string;
    };
    language: {
      label: string;
      current: string;
      en: string;
      id: string;
      toggle: string;
    };
  };

  nav: {
    todos: {
      label: string;
      description: string;
    };
    posts: {
      label: string;
      description: string;
    };
  };

  todos: {
    title: string;
    subtitle: string;
    subtitleEmpty: string;
    progressLabel: string;
    addPlaceholder: string;
    addButton: string;
    addHint: string;
    filters: {
      all: string;
      pending: string;
      completed: string;
    };
    emptyTitle: string;
    emptyDescription: string;
    emptyFilterTitle: string;
    emptyFilterDescription: string;
    countBadge: string;
    keyboardHint: string;
    deleteAria: string;
    markComplete: string;
    markIncomplete: string;
  };

  posts: {
    title: string;
    description: string;
    searchLabel: string;
    searchPlaceholder: string;
    searchButton: string;
    searchHint: string;
    emptyTitle: string;
    emptyDescription: string;
    emptySearchDescription: string;
    showingCount: string;
    retryLoad: string;
    ariaPost: string;
  };

  postDetail: {
    loading: string;
    invalidId: string;
    error: string;
    notFoundTitle: string;
    notFoundDescription: string;
    postLabel: string;
    postHeaderLabel: string;
    comments: string;
    commentsCount: string;
    loadingComments: string;
    commentsEmptyTitle: string;
    commentsEmptyDescription: string;
    commentLabel: string;
    back: string;
  };

  notFoundPage: {
    title: string;
    backHome: string;
  };

  errorState: {
    title: string;
    retryAria: string;
  };
};
