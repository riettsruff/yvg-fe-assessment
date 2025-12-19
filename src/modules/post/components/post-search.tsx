import { ArrowRight, Search } from 'lucide-react';
import { useId } from 'react';

import { Button } from '@/components/core/button';
import { Input } from '@/components/core/input';

export interface PostSearchProps {
  pendingSearch: string;
  label: string;
  placeholder: string;
  hint: string;
  buttonLabel: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const PostSearch = ({
  pendingSearch,
  label,
  placeholder,
  hint,
  buttonLabel,
  onChange,
  onSearch,
}: PostSearchProps) => {
  const searchInputId = useId();

  return (
    <div className="mb-8" role="search" aria-label={label}>
      <label htmlFor={searchInputId} className="sr-only">
        {label}
      </label>
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        <div className="relative flex-1 sm:min-w-[280px]">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id={searchInputId}
            value={pendingSearch}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            placeholder={placeholder}
            className="pl-12 h-12 md:h-14 text-base bg-card border-border/50 placeholder:text-muted-foreground focus:border-primary"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            aria-describedby="search-hint"
          />
        </div>
        <Button
          onClick={onSearch}
          size="lg"
          className="w-full sm:w-auto h-12 md:h-14 px-8 gap-2 bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold shadow-glow"
          aria-label={buttonLabel}
        >
          {buttonLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
      <p id="search-hint" className="text-xs text-muted-foreground mt-2">
        {hint}
      </p>
    </div>
  );
};
