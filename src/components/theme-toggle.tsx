import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/core/button';
import { useI18n } from '@/contexts/locale-context';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/utils/cn';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === 'dark';
  const nextThemeLabel = isDark ? t('common.theme.light') : t('common.theme.dark');
  const currentThemeLabel = isDark ? t('common.theme.dark') : t('common.theme.light');

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={t('common.theme.toggle', { theme: nextThemeLabel })}
      title={t('common.theme.current', { theme: currentThemeLabel })}
      className="relative h-10 w-10 rounded-full border border-border/60 bg-secondary/80 hover:bg-secondary text-foreground shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Sun
        className={cn(
          'h-5 w-5 transition-all duration-300',
          isDark ? 'opacity-0 -rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100',
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          'absolute h-5 w-5 transition-all duration-300',
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75',
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{t('common.theme.label')}</span>
    </Button>
  );
};
