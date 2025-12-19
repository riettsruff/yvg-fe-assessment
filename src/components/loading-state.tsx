import { Loader2 } from 'lucide-react';

import { useI18n } from '@/contexts/locale-context';

export interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message }: LoadingStateProps) => {
  const { t } = useI18n();
  const displayMessage = message || t('common.loading');

  return (
    <div
      className="flex flex-col items-center justify-center py-16 animate-fade-in"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative">
        <div
          className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-glow-pulse"
          aria-hidden="true"
        />
        <Loader2 className="h-10 w-10 text-primary animate-spin relative z-10" aria-hidden="true" />
      </div>
      <p className="text-muted-foreground text-sm mt-6 font-medium">{displayMessage}</p>
      <span className="sr-only">{t('common.loadingAlt')}</span>
    </div>
  );
};
