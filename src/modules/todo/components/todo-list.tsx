import { type ReactNode } from 'react';

import { EmptyState } from '@/components/empty-state';

import { type Todo } from '../model';
import { TodoItem } from './todo-item';

interface TodoListProps {
  todos: Todo[];
  allTodos: Todo[];
  emptyTitle: string;
  emptyDescription: string;
  emptyFilteredDescription: string;
  emptyIcon?: ReactNode;
  markCompleteLabel: (text: string) => string;
  markIncompleteLabel: (text: string) => string;
  deleteLabel: (text: string) => string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList = ({
  todos,
  allTodos,
  emptyTitle,
  emptyDescription,
  emptyFilteredDescription,
  emptyIcon,
  markCompleteLabel,
  markIncompleteLabel,
  deleteLabel,
  onToggle,
  onDelete,
}: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyTitle}
        description={allTodos.length === 0 ? emptyDescription : emptyFilteredDescription}
      />
    );
  }

  return (
    <ul className="space-y-3" aria-label="Todos">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          onToggle={() => onToggle(todo.id)}
          onDelete={() => onDelete(todo.id)}
          markCompleteLabel={markCompleteLabel(todo.text)}
          markIncompleteLabel={markIncompleteLabel(todo.text)}
          deleteLabel={deleteLabel(todo.text)}
        />
      ))}
    </ul>
  );
};
