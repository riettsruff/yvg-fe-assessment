import { z } from 'zod';

export const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export const commentSchema = z.object({
  postId: z.number(),
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  body: z.string(),
});

export const postsListSchema = z.array(postSchema);
export const commentsListSchema = z.array(commentSchema);
