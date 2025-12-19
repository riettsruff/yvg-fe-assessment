import { Check, Circle, Trash2 } from 'lucide-react';
import { useId } from 'react';

import { Button } from '@/components/core/button';
import { cn } from '@/utils/cn';

import { type Todo } from '../model';

interface TodoItemProps {
  todo: Todo;
  index: number;
  markCompleteLabel: string;
  markIncompleteLabel: string;
  deleteLabel: string;
  onToggle: () => void;
  onDelete: () => void;
}

export const TodoItem = ({
  todo,
  index,
  markCompleteLabel,
  markIncompleteLabel,
  deleteLabel,
  onToggle,
  onDelete,
}: TodoItemProps) => {
  const itemId = useId();

  return (
    <li
      className={cn(
        'group flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-xl border transition-all duration-300 animate-slide-up',
        todo.completed
          ? 'bg-card/50 border-border/30'
          : 'bg-card border-border/50 hover:border-primary/30 hover:shadow-md',
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        onClick={onToggle}
        className={cn(
          'flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          todo.completed
            ? 'bg-primary text-primary-foreground border border-primary shadow-glow'
            : 'border-2 border-border hover:border-primary hover:bg-primary/10',
        )}
        aria-label={todo.completed ? markIncompleteLabel : markCompleteLabel}
        aria-pressed={todo.completed}
      >
        {todo.completed ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Circle
            className="h-4 w-4 opacity-0 group-hover:opacity-50 transition-opacity"
            aria-hidden="true"
          />
        )}
      </button>

      <span
        id={itemId}
        className={cn(
          'flex-1 text-sm md:text-base transition-all duration-300',
          todo.completed && 'line-through text-muted-foreground',
        )}
      >
        {todo.text}
      </span>

      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-200 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        aria-label={deleteLabel}
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </Button>
    </li>
  );
};
