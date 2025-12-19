import { fireEvent, render, screen } from '@testing-library/react';

import { TodoList } from '@/modules/todo/components/todo-list';

describe('TodoList', () => {
  const todos = [
    { id: '1', text: 'Task one', completed: false, createdAt: 0 },
    { id: '2', text: 'Task two', completed: true, createdAt: 1 },
  ];

  it('renders todos and wires toggle/delete handlers with labels', () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();
    render(
      <TodoList
        todos={todos}
        allTodos={todos}
        emptyTitle="No todos"
        emptyDescription="Nothing here"
        emptyFilteredDescription="No filtered todos"
        emptyIcon={<span data-testid="empty-icon" />}
        markCompleteLabel={(text) => `Complete ${text}`}
        markIncompleteLabel={(text) => `Uncomplete ${text}`}
        deleteLabel={(text) => `Delete ${text}`}
        onToggle={onToggle}
        onDelete={onDelete}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Complete Task one' }));
    expect(onToggle).toHaveBeenCalledWith('1');

    fireEvent.click(screen.getByRole('button', { name: 'Delete Task two' }));
    expect(onDelete).toHaveBeenCalledWith('2');
  });

  it('shows empty state when there are no todos at all', () => {
    render(
      <TodoList
        todos={[]}
        allTodos={[]}
        emptyTitle="No todos"
        emptyDescription="Nothing here"
        emptyFilteredDescription="No filtered todos"
        markCompleteLabel={(text) => text}
        markIncompleteLabel={(text) => text}
        deleteLabel={(text) => text}
        onToggle={jest.fn()}
        onDelete={jest.fn()}
      />,
    );

    expect(screen.getByText('No todos')).toBeInTheDocument();
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('shows filtered empty state when todos are filtered out', () => {
    render(
      <TodoList
        todos={[]}
        allTodos={todos}
        emptyTitle="No todos"
        emptyDescription="Nothing here"
        emptyFilteredDescription="Filtered out"
        markCompleteLabel={(text) => text}
        markIncompleteLabel={(text) => text}
        deleteLabel={(text) => text}
        onToggle={jest.fn()}
        onDelete={jest.fn()}
      />,
    );

    expect(screen.getByText('Filtered out')).toBeInTheDocument();
  });
});
