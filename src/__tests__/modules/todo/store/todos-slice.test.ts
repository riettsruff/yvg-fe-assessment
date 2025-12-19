import { type TodosState } from '@/modules/todo/model';
import reducer, {
  addTodo,
  deleteTodo,
  hydrateTodos,
  setFilter,
  toggleTodo,
} from '@/modules/todo/store/todos-slice';

const baseState: TodosState = {
  items: [
    { id: '1', text: 'First', completed: false, createdAt: 1 },
    { id: '2', text: 'Second', completed: true, createdAt: 2 },
  ],
  filter: 'all',
};

const originalCrypto = global.crypto;

describe('todosSlice reducers', () => {
  beforeEach(() => {
    (global as any).crypto = {
      ...originalCrypto,
      randomUUID: jest.fn(() => 'generated-id'),
    };
    (global as any).window.crypto = (global as any).crypto;
    jest.spyOn(Date, 'now').mockReturnValue(1000);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    (global as any).crypto = originalCrypto;
  });

  it('adds a todo with generated metadata', () => {
    const state = reducer(baseState, addTodo('New todo'));
    const added = state.items[state.items.length - 1];

    expect(state.items).toHaveLength(baseState.items.length + 1);
    expect(added).toMatchObject({
      text: 'New todo',
      completed: false,
      createdAt: 1000,
    });
    expect(added.id).toBeTruthy();
  });

  it('toggles completion status when todo exists', () => {
    const toggled = reducer(baseState, toggleTodo('1'));
    expect(toggled.items.find((t) => t.id === '1')?.completed).toBe(true);
  });

  it('ignores toggle when todo does not exist', () => {
    const state = reducer(baseState, toggleTodo('missing'));
    expect(state.items).toEqual(baseState.items);
  });

  it('deletes a todo by id', () => {
    const state = reducer(baseState, deleteTodo('1'));
    expect(state.items).toEqual([baseState.items[1]]);
  });

  it('updates the active filter', () => {
    const state = reducer(baseState, setFilter('completed'));
    expect(state.filter).toBe('completed');
  });

  it('hydrates todos from payload', () => {
    const nextItems = [{ id: '99', text: 'Loaded', completed: false, createdAt: 5 }];
    const state = reducer(baseState, hydrateTodos(nextItems));
    expect(state.items).toEqual(nextItems);
  });
});

describe('todosSlice initial state', () => {
  afterEach(() => {
    jest.resetModules();
    jest.dontMock('@/modules/todo/services');
  });

  it('uses loadTodosFromStorage to build initial state', () => {
    jest.resetModules();
    const mockLoad = jest.fn(() => baseState.items);
    jest.doMock('@/modules/todo/services', () => ({
      loadTodosFromStorage: mockLoad,
    }));

    jest.isolateModules(() => {
      const mod = require('@/modules/todo/store/todos-slice');
      const initialState = mod.default(undefined, { type: 'init' });

      expect(mockLoad).toHaveBeenCalled();
      expect(initialState.items).toEqual(baseState.items);
      expect(initialState.filter).toBe('all');
    });
  });
});
