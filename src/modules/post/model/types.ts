import { z } from 'zod';

import { commentSchema, postSchema } from './schema';

export type PostId = number;
export type UserId = number;

export type Post = z.infer<typeof postSchema>;
export type Comment = z.infer<typeof commentSchema>;
