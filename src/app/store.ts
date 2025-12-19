import { type Middleware, configureStore } from '@reduxjs/toolkit';

import { persistTodosToStorage, todosReducer } from '@/modules/todo';

const todosPersistenceMiddleware: Middleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  const state = storeApi.getState();
  const todos = state.todos?.items;
  if (Array.isArray(todos)) {
    persistTodosToStorage(todos);
  }
  return result;
};

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosPersistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
