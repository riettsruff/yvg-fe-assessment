import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { type FilterType, type Todo, type TodosState } from '../model';
import { loadTodosFromStorage } from '../services';

const initialState: TodosState = {
  items: loadTodosFromStorage(),
  filter: 'all',
};

const generateTodoId = () =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: generateTodoId(),
        text: action.payload,
        completed: false,
        createdAt: Date.now(),
      };
      state.items.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    hydrateTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, setFilter, hydrateTodos } = todosSlice.actions;
export default todosSlice.reducer;
