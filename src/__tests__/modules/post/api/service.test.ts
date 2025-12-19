import { fetchCommentsByPostId, fetchPostById, fetchPosts } from '@/modules/post/api/service';

const createResponse = (ok: boolean, data: unknown): Response =>
  ({
    ok,
    json: jest.fn().mockResolvedValue(data),
  }) as unknown as Response;

describe('post API service', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('fetches posts and returns parsed data', async () => {
    const posts = [{ userId: 1, id: 1, title: 'Hello', body: 'World' }];
    (global.fetch as jest.Mock).mockResolvedValue(createResponse(true, posts));

    await expect(fetchPosts()).resolves.toEqual(posts);
    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
  });

  it('throws when fetching a post fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue(createResponse(false, {}));

    await expect(fetchPostById(99)).rejects.toThrow('Failed to fetch post');
    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/99');
  });

  it('throws when comment schema validation fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue(createResponse(true, [{ id: 1 }]));

    await expect(fetchCommentsByPostId(1)).rejects.toThrow('Failed to fetch comments');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/comments?postId=1',
    );
  });
});
