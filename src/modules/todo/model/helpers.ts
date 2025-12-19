import { type FilterType, type Todo } from './types';

export const filterTodos = (items: Todo[], filter: FilterType) => {
  if (filter === 'completed') return items.filter((todo) => todo.completed);
  if (filter === 'pending') return items.filter((todo) => !todo.completed);
  return items;
};

export const computeTodoStats = (items: Todo[]) => {
  const completed = items.filter((t) => t.completed).length;
  const total = items.length;
  const pending = total - completed;

  return {
    total,
    completed,
    pending,
    progressPercent: total > 0 ? (completed / total) * 100 : 0,
  };
};
