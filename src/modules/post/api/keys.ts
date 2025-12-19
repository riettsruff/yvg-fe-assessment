export const postsKeys = {
  all: ['posts'] as const,
  detail: (id: number) => ['post', id] as const,
  comments: (id: number) => ['post', id, 'comments'] as const,
};
