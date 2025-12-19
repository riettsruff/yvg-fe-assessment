import { Plus } from 'lucide-react';
import { FormEvent, useId } from 'react';

import { Button } from '@/components/core/button';
import { Input } from '@/components/core/input';

interface TodoFormProps {
  value: string;
  placeholder: string;
  buttonLabel: string;
  hint: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

export const TodoForm = ({
  value,
  placeholder,
  buttonLabel,
  hint,
  onChange,
  onSubmit,
}: TodoFormProps) => {
  const inputId = useId();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      onSubmit(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 md:mb-8" role="form" aria-label={buttonLabel}>
      <label htmlFor={inputId} className="sr-only">
        {placeholder}
      </label>
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        <div className="flex-1 sm:min-w-[280px]">
          <Input
            id={inputId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="h-12 md:h-14 text-base bg-card border-border/50 focus:border-primary placeholder:text-muted-foreground"
            aria-describedby="task-hint"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto h-12 md:h-14 gap-2 px-8 bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold shadow-glow"
          disabled={!value.trim()}
          aria-label={buttonLabel}
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
          <span>{buttonLabel}</span>
        </Button>
      </div>
      <p id="task-hint" className="sr-only">
        {hint}
      </p>
    </form>
  );
};
