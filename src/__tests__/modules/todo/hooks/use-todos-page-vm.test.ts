import { act, renderHook } from '@testing-library/react';

import { useTodosPageVM } from '@/modules/todo/hooks';
import { type TodosState } from '@/modules/todo/model';
import { addTodo, deleteTodo, setFilter, toggleTodo } from '@/modules/todo/store';

type MockRootState = { todos: TodosState };

const mockDispatch = jest.fn();
let mockState: MockRootState = {
  todos: {
    items: [
      { id: '1', text: 'One', completed: false, createdAt: 1 },
      { id: '2', text: 'Two', completed: true, createdAt: 2 },
    ],
    filter: 'all',
  },
};

jest.mock('@/hooks/use-app-dispatch', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: MockRootState) => TodosState) => selector(mockState),
}));

describe('useTodosPageVM', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockState = {
      todos: {
        items: [
          { id: '1', text: 'One', completed: false, createdAt: 1 },
          { id: '2', text: 'Two', completed: true, createdAt: 2 },
        ],
        filter: 'all',
      },
    };
  });

  it('returns filtered todos and computed stats', () => {
    mockState.todos.filter = 'completed';
    const { result } = renderHook(() => useTodosPageVM());

    expect(result.current.filteredTodos).toEqual([mockState.todos.items[1]]);
    expect(result.current.stats).toEqual({
      total: 2,
      completed: 1,
      pending: 1,
      progressPercent: 50,
    });
  });

  it('dispatches actions for add, toggle, remove, and filter changes', () => {
    const { result } = renderHook(() => useTodosPageVM());

    act(() => result.current.add('New item'));
    expect(mockDispatch).toHaveBeenCalledWith(addTodo('New item'));

    act(() => result.current.toggle('1'));
    expect(mockDispatch).toHaveBeenCalledWith(toggleTodo('1'));

    act(() => result.current.remove('2'));
    expect(mockDispatch).toHaveBeenCalledWith(deleteTodo('2'));

    act(() => result.current.setFilter('pending'));
    expect(mockDispatch).toHaveBeenCalledWith(setFilter('pending'));
  });
});
