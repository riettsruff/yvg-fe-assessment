import { AlertCircle, RefreshCw } from 'lucide-react';

import { useI18n } from '@/contexts/locale-context';

import { Button } from './core/button';

export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  const { t } = useI18n();

  return (
    <div
      className="flex flex-col items-center justify-center py-16 animate-fade-in"
      role="alert"
      aria-live="assertive"
    >
      <div className="relative mb-6">
        <div
          className="absolute inset-0 bg-destructive/20 rounded-full blur-xl scale-150"
          aria-hidden="true"
        />
        <div className="relative h-20 w-20 rounded-2xl bg-destructive/10 border border-destructive/30 flex items-center justify-center">
          <AlertCircle className="h-10 w-10 text-destructive" aria-hidden="true" />
        </div>
      </div>
      <h3 className="font-semibold text-lg mb-2">{t('errorState.title')}</h3>
      <p className="text-muted-foreground text-sm text-center max-w-sm mb-6">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="gap-2 border-destructive/30 hover:bg-destructive/10 hover:border-destructive/50"
          aria-label={t('errorState.retryAria')}
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          {t('common.tryAgain')}
        </Button>
      )}
    </div>
  );
};
