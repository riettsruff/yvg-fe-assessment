import { fireEvent, render, screen } from '@testing-library/react';

import { TodoItem } from '@/modules/todo/components/todo-item';

describe('TodoItem', () => {
  const baseTodo = { id: '1', text: 'Do homework', completed: false, createdAt: Date.now() };

  it('renders incomplete todo and triggers toggle/delete', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(
      <TodoItem
        todo={baseTodo}
        index={0}
        markCompleteLabel="Complete it"
        markIncompleteLabel="Undo completion"
        deleteLabel="Delete item"
        onToggle={onToggle}
        onDelete={onDelete}
      />,
    );

    const toggleBtn = screen.getByRole('button', { name: 'Complete it' });
    expect(toggleBtn).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(toggleBtn);
    expect(onToggle).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Delete item' }));
    expect(onDelete).toHaveBeenCalled();
    expect(screen.getByText('Do homework')).not.toHaveClass('line-through');
  });

  it('renders completed todo with correct labels', () => {
    render(
      <TodoItem
        todo={{ ...baseTodo, completed: true }}
        index={1}
        markCompleteLabel="Complete it"
        markIncompleteLabel="Undo completion"
        deleteLabel="Delete item"
        onToggle={jest.fn()}
        onDelete={jest.fn()}
      />,
    );

    const toggleBtn = screen.getByRole('button', { name: 'Undo completion' });
    expect(toggleBtn).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Do homework')).toHaveClass('line-through');
  });
});
