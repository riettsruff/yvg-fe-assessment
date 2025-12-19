import { computeTodoStats, filterTodos } from '@/modules/todo/model/helpers';
import { type Todo } from '@/modules/todo/model/types';

const buildTodos = (): Todo[] => [
  { id: '1', text: 'One', completed: false, createdAt: 1 },
  { id: '2', text: 'Two', completed: true, createdAt: 2 },
  { id: '3', text: 'Three', completed: false, createdAt: 3 },
];

describe('filterTodos', () => {
  const todos = buildTodos();

  it('returns all todos when filter is "all"', () => {
    expect(filterTodos(todos, 'all')).toEqual(todos);
  });

  it('returns only completed todos', () => {
    expect(filterTodos(todos, 'completed')).toEqual([todos[1]]);
  });

  it('returns only pending todos', () => {
    expect(filterTodos(todos, 'pending')).toEqual([todos[0], todos[2]]);
  });
});

describe('computeTodoStats', () => {
  it('returns zeros when no todos exist', () => {
    expect(computeTodoStats([])).toEqual({
      total: 0,
      completed: 0,
      pending: 0,
      progressPercent: 0,
    });
  });

  it('calculates counts and progress percent', () => {
    const stats = computeTodoStats(buildTodos());

    expect(stats).toEqual({
      total: 3,
      completed: 1,
      pending: 2,
      progressPercent: (1 / 3) * 100,
    });
  });
});
