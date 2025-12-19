import { Button } from '@/components/core/button';
import { useI18n } from '@/contexts/locale-context';

export const LanguageToggle = () => {
  const { locale, toggleLocale, t } = useI18n();
  const nextLocale = locale === 'en' ? 'id' : 'en';

  const currentLabel = locale === 'en' ? t('common.language.en') : t('common.language.id');
  const nextLabel = nextLocale === 'en' ? t('common.language.en') : t('common.language.id');

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleLocale}
      aria-label={t('common.language.toggle', { language: nextLabel })}
      title={t('common.language.current', { language: currentLabel })}
      className="h-10 w-10 rounded-full border border-border/60 bg-secondary/80 hover:bg-secondary text-foreground shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background font-semibold text-xs tracking-wide"
    >
      {locale.toUpperCase()}
    </Button>
  );
};
