import { postsKeys } from '@/modules/post/api/keys';

describe('postsKeys', () => {
  it('builds all posts key', () => {
    expect(postsKeys.all).toEqual(['posts']);
  });

  it('builds detail key with id', () => {
    expect(postsKeys.detail(10)).toEqual(['post', 10]);
  });

  it('builds comments key with id', () => {
    expect(postsKeys.comments(5)).toEqual(['post', 5, 'comments']);
  });
});
