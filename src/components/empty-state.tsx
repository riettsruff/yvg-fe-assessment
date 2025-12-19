import { Inbox } from 'lucide-react';
import { ReactNode } from 'react';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <div
    className="flex flex-col items-center justify-center py-16 animate-fade-in"
    role="status"
    aria-label={`${title}${description ? `. ${description}` : ''}`}
  >
    <div className="relative mb-6">
      <div
        className="absolute inset-0 bg-muted rounded-full blur-xl scale-150"
        aria-hidden="true"
      />
      <div className="relative h-20 w-20 rounded-2xl bg-card border border-border flex items-center justify-center">
        {icon || <Inbox className="h-10 w-10 text-muted-foreground" aria-hidden="true" />}
      </div>
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    {description && (
      <p className="text-muted-foreground text-sm text-center max-w-sm mb-6">{description}</p>
    )}
    {action}
  </div>
);
