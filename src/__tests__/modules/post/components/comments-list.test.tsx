import { render, screen } from '@testing-library/react';

import { CommentsEmptyIllustration, CommentsList } from '@/modules/post/components/comments-list';

describe('CommentsList', () => {
  const comments = [
    { postId: 1, id: 1, name: 'Alice', email: 'alice@mail.com', body: 'First comment' },
    { postId: 1, id: 2, name: 'Bob', email: 'bob@mail.com', body: 'Second comment' },
  ];

  it('renders comments with labels and passes animation delays', () => {
    const getCommentLabel = jest.fn((comment) => `Label ${comment.id}`);

    render(<CommentsList comments={comments} label="Comments" getCommentLabel={getCommentLabel} />);

    expect(screen.getByRole('list', { name: 'Comments' })).toBeInTheDocument();
    comments.forEach((comment, index) => {
      expect(screen.getByText(comment.name)).toBeInTheDocument();
      expect(screen.getByText(comment.email)).toBeInTheDocument();
      expect(screen.getByText(comment.body)).toBeInTheDocument();
      const item = screen.getByText(comment.body).closest('li');
      expect(item?.style.animationDelay).toBe(`${index * 75}ms`);
    });
  });
});

describe('CommentsEmptyIllustration', () => {
  it('renders the message square icon', () => {
    render(<CommentsEmptyIllustration />);
    expect(document.querySelector('[data-icon="MessageSquare"]')).toBeInTheDocument();
  });
});
