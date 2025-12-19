import { useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/use-app-dispatch';

import { type FilterType, computeTodoStats, filterTodos } from '../model';
import { addTodo, deleteTodo, setFilter, toggleTodo } from '../store';

export const useTodosPageVM = () => {
  const dispatch = useAppDispatch();
  const { items, filter } = useAppSelector((state) => state.todos);

  const filteredTodos = useMemo(() => filterTodos(items, filter), [filter, items]);
  const stats = useMemo(() => computeTodoStats(items), [items]);

  return {
    items,
    filter,
    filteredTodos,
    stats,
    add: (text: string) => dispatch(addTodo(text)),
    toggle: (id: string) => dispatch(toggleTodo(id)),
    remove: (id: string) => dispatch(deleteTodo(id)),
    setFilter: (next: FilterType) => dispatch(setFilter(next)),
  };
};
