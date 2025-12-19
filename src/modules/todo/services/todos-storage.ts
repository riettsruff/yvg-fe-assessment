import { type Todo } from '../model';

const STORAGE_KEY = 'todos';

export const loadTodosFromStorage = (): Todo[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Todo[]) : [];
  } catch {
    return [];
  }
};

export const persistTodosToStorage = (todos: Todo[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // ignore write errors
  }
};
