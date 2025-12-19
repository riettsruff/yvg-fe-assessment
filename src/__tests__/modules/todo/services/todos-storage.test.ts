import { type Todo } from '@/modules/todo/model';
import { loadTodosFromStorage, persistTodosToStorage } from '@/modules/todo/services/todos-storage';

const sampleTodos: Todo[] = [
  { id: '1', text: 'Test', completed: false, createdAt: 1 },
  { id: '2', text: 'Done', completed: true, createdAt: 2 },
];

describe('loadTodosFromStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns stored todos when JSON is valid', () => {
    localStorage.setItem('todos', JSON.stringify(sampleTodos));

    expect(loadTodosFromStorage()).toEqual(sampleTodos);
  });

  it('returns an empty list when window is undefined', () => {
    const originalWindow = global.window;
    delete (global as any).window;

    expect(loadTodosFromStorage()).toEqual([]);

    global.window = originalWindow;
  });

  it('returns an empty list when parsing fails', () => {
    localStorage.setItem('todos', '{not-json}');

    expect(loadTodosFromStorage()).toEqual([]);
  });
});

describe('persistTodosToStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('persists todos when window is available', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem');

    persistTodosToStorage(sampleTodos);

    expect(spy).toHaveBeenCalledWith('todos', JSON.stringify(sampleTodos));
  });

  it('silently ignores write errors', () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('write failed');
    });

    expect(() => persistTodosToStorage(sampleTodos)).not.toThrow();
  });

  it('does nothing when window is undefined', () => {
    const originalWindow = global.window;
    delete (global as any).window;
    const spy = jest.spyOn(Storage.prototype, 'setItem');

    expect(() => persistTodosToStorage(sampleTodos)).not.toThrow();
    expect(spy).not.toHaveBeenCalled();

    global.window = originalWindow;
  });
});
