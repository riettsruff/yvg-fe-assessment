import { Button } from '@/components/core/button';
import { cn } from '@/utils/cn';

import { type FilterType } from '../model';

interface FilterOption {
  value: FilterType;
  label: string;
}

interface FilterCounts {
  total: number;
  completed: number;
  pending: number;
}

interface TodoFilterTabsProps {
  active: FilterType;
  options: FilterOption[];
  counts: FilterCounts;
  label: string;
  onChange: (next: FilterType) => void;
}

export const TodoFilterTabs = ({
  active,
  options,
  counts,
  label,
  onChange,
}: TodoFilterTabsProps) => (
  <div className="flex flex-wrap gap-2 mb-6 md:mb-8" role="tablist" aria-label={label}>
    {options.map(({ value, label: optionLabel }) => {
      const count =
        value === 'all' ? counts.total : value === 'completed' ? counts.completed : counts.pending;
      const isActive = active === value;

      return (
        <Button
          key={value}
          role="tab"
          aria-selected={isActive}
          aria-controls="task-list"
          variant="secondary"
          size="sm"
          onClick={() => onChange(value)}
          className={cn(
            'gap-2 transition-all duration-200 border border-border/50',
            isActive
              ? 'bg-gradient-primary text-primary-foreground shadow-glow'
              : 'bg-secondary/80 text-foreground hover:bg-secondary',
          )}
        >
          {optionLabel}
          <span
            className={cn(
              'text-xs px-2 py-0.5 rounded-full',
              isActive
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-foreground/10 text-muted-foreground',
            )}
          >
            {count}
          </span>
        </Button>
      );
    })}
  </div>
);
