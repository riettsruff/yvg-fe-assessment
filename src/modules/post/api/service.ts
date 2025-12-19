import { type ZodTypeAny, z } from 'zod';

import { jsonPlaceholderBaseUrl } from '@/shared/config/api';

import { type Comment, type Post, commentsListSchema, postSchema, postsListSchema } from '../model';

const BASE_URL = jsonPlaceholderBaseUrl;

const parseResponse = async <Schema extends ZodTypeAny>(
  response: Response,
  schema: Schema,
  fallbackMessage: string,
): Promise<z.infer<Schema>> => {
  if (!response.ok) {
    throw new Error(fallbackMessage);
  }

  const data = await response.json();
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    throw new Error(fallbackMessage);
  }

  return parsed.data;
};

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`);
  return parseResponse(response, postsListSchema, 'Failed to fetch posts');
};

export const fetchPostById = async (postId: number): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  return parseResponse(response, postSchema, 'Failed to fetch post');
};

export const fetchCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);
  return parseResponse(response, commentsListSchema, 'Failed to fetch comments');
};
