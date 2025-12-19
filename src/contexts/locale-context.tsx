import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { type Locale, type TranslationKey, type TranslationParams, locales } from '@/locales';

type GenericParams = Record<string, string | number | undefined>;

type TranslateFn = {
  <Key extends TranslationKey>(key: Key, params?: TranslationParams<Key>): string;
  (key: string, params?: GenericParams): string;
};

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: TranslateFn;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = 'locale';
const DEFAULT_LOCALE: Locale = 'en';

const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'id') return stored;

  const browser = navigator.language?.toLowerCase();
  if (browser.startsWith('id')) return 'id';

  return DEFAULT_LOCALE;
};

const resolvePath = <T, Key extends string>(obj: T, key: Key): unknown =>
  key.split('.').reduce<unknown>((acc, segment) => {
    if (acc && typeof acc === 'object' && segment in acc) {
      return (acc as Record<string, unknown>)[segment];
    }
    return undefined;
  }, obj as unknown);

const formatTemplate = (value: string, params?: GenericParams) =>
  params
    ? value.replace(/\{(\w+)\}/g, (_, match: string) =>
        params && match in params && params[match as keyof typeof params] !== undefined
          ? String(params[match as keyof typeof params])
          : `{${match}}`,
      )
    : value;

export const __testUtils = {
  getInitialLocale,
  formatTemplate,
};

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      localStorage.setItem(STORAGE_KEY, locale);
    }
  }, [locale]);

  const translate = useMemo<TranslateFn>(() => {
    return ((key: string, params?: GenericParams) => {
      const current = locales[locale] ?? locales[DEFAULT_LOCALE];
      const fallback = locales[DEFAULT_LOCALE];
      const value = resolvePath(current, key) ?? resolvePath(fallback, key);

      if (typeof value === 'string') {
        return formatTemplate(value, params);
      }

      return key;
    }) as TranslateFn;
  }, [locale]);

  const setLocale = (next: Locale) => setLocaleState(next);
  const toggleLocale = () => setLocaleState((prev) => (prev === 'en' ? 'id' : 'en'));

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t: translate,
    }),
    [locale, translate],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useI18n must be used within a LocaleProvider');
  }
  return context;
};
