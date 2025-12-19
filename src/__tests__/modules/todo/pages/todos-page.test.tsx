import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import TodosPage from '@/modules/todo/pages/todos-page';

const mockUseTodosPageVM = jest.fn();
let navigationType: 'POP' | 'PUSH' | 'REPLACE' = 'PUSH';
let capturedFormProps: any;
let capturedListProps: any;
let capturedFilterProps: any;

jest.mock('@/modules/todo/hooks', () => ({
  useTodosPageVM: () => mockUseTodosPageVM(),
}));

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigationType: () => navigationType,
  };
});

jest.mock('@/modules/todo/components', () => {
  const TodoForm = (props: any) => {
    capturedFormProps = props;
    return (
      <div data-testid="todo-form">
        <input
          data-testid="todo-input"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <button onClick={() => props.onSubmit(props.value.trim())} aria-label={props.buttonLabel}>
          Submit
        </button>
        <span>{props.hint}</span>
      </div>
    );
  };

  const TodoFilterTabs = (props: any) => {
    capturedFilterProps = props;
    return (
      <div data-testid="todo-filters">
        {props.options.map((opt: any) => (
          <button key={opt.value} onClick={() => props.onChange(opt.value)}>
            {opt.label}
          </button>
        ))}
      </div>
    );
  };

  const TodoList = (props: any) => {
    capturedListProps = props;
    const sampleText = props.todos[0]?.text ?? 'Sample';
    const labelPreview = [
      props.markCompleteLabel(sampleText),
      props.markIncompleteLabel(sampleText),
      props.deleteLabel(sampleText),
    ];
    return (
      <div data-testid="todo-list">
        <span data-testid="todo-labels">{labelPreview.join(' | ')}</span>
        {props.todos.length === 0 ? (
          <div>
            {props.allTodos.length === 0 ? props.emptyDescription : props.emptyFilteredDescription}
          </div>
        ) : (
          props.todos.map((todo: any) => (
            <div key={todo.id}>
              <button onClick={() => props.onToggle(todo.id)}>{todo.text}</button>
              <button onClick={() => props.onDelete(todo.id)}>Delete {todo.text}</button>
            </div>
          ))
        )}
      </div>
    );
  };

  return { TodoForm, TodoFilterTabs, TodoList };
});

jest.mock('@/contexts/locale-context', () => ({
  useI18n: () => ({
    t: (key: string, params?: Record<string, number>) =>
      typeof params?.percent !== 'undefined' ? `${key}-${Math.round(params.percent)}` : key,
  }),
}));

const buildState = (overrides: Partial<ReturnType<typeof mockUseTodosPageVM>> = {}) => ({
  items: [],
  filter: 'all',
  filteredTodos: [],
  stats: { total: 0, completed: 0, pending: 0, progressPercent: 0 },
  add: jest.fn(),
  toggle: jest.fn(),
  remove: jest.fn(),
  setFilter: jest.fn(),
  ...overrides,
});

describe('TodosPage', () => {
  beforeEach(() => {
    mockUseTodosPageVM.mockReset();
    navigationType = 'PUSH';
    capturedFormProps = undefined;
    capturedListProps = undefined;
    capturedFilterProps = undefined;
    window.scrollTo = jest.fn();
  });

  it('renders form and empty state when there are no todos', () => {
    const add = jest.fn();
    mockUseTodosPageVM.mockReturnValue(buildState({ add }));

    render(<TodosPage />);

    expect(screen.getByText('todos.title')).toBeInTheDocument();
    expect(screen.getByTestId('todo-list')).toHaveTextContent('todos.emptyDescription');

    // Adding a task trims value and resets input
    fireEvent.change(screen.getByTestId('todo-input'), { target: { value: '  New Task  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'todos.addButton' }));
    expect(add).toHaveBeenCalledWith('New Task');
    expect(screen.getByTestId('todo-input')).toHaveValue('');
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
  });

  it('renders filters, progress, and list when todos exist', () => {
    navigationType = 'POP';
    const toggle = jest.fn();
    const remove = jest.fn();
    const setFilter = jest.fn();
    const items = [
      { id: '1', text: 'Task 1', completed: false, createdAt: 0 },
      { id: '2', text: 'Task 2', completed: true, createdAt: 1 },
    ];

    mockUseTodosPageVM.mockReturnValue(
      buildState({
        items,
        filteredTodos: items.slice(0, 1),
        filter: 'pending',
        stats: { total: 2, completed: 1, pending: 1, progressPercent: 50 },
        toggle,
        remove,
        setFilter,
      }),
    );

    render(<TodosPage />);

    expect(screen.getByTestId('todo-filters')).toBeInTheDocument();
    expect(capturedFilterProps.active).toBe('pending');
    fireEvent.click(screen.getByText('todos.filters.all'));
    expect(setFilter).toHaveBeenCalledWith('all');

    fireEvent.click(screen.getByText('Task 1'));
    expect(toggle).toHaveBeenCalledWith('1');
    fireEvent.click(screen.getByText('Delete Task 1'));
    expect(remove).toHaveBeenCalledWith('1');

    // Progress bar attributes
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
