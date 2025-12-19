import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme';

const resolveWindow = (win?: typeof window | null) => {
  if (win !== undefined) return win ?? undefined;
  return typeof window === 'undefined' ? undefined : window;
};

const getDocumentElement = (doc?: Document | null) => {
  if (doc !== undefined) return doc?.documentElement ?? null;
  return typeof document === 'undefined' ? null : document.documentElement;
};

const getPreferredTheme = (win = resolveWindow()): Theme => {
  if (!win) return 'light';

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;

  const systemPrefersDark = win.matchMedia('(prefers-color-scheme: dark)').matches;
  return systemPrefersDark ? 'dark' : 'light';
};

const applyThemeToDocument = (theme: Theme, root = getDocumentElement()) => {
  if (!root) return;

  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  root.style.colorScheme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

const attachThemeMediaListener = (setTheme: (theme: Theme) => void, win = resolveWindow()) => {
  if (!win) return;

  const mediaQuery = win.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = (event: MediaQueryListEvent) => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return;
    setTheme(event.matches ? 'dark' : 'light');
  };

  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
};

export const __testUtils = {
  getPreferredTheme,
  applyThemeToDocument,
  resolveWindow,
  getDocumentElement,
  attachThemeMediaListener,
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const initialTheme = getPreferredTheme();
    applyThemeToDocument(initialTheme);
    return initialTheme;
  });

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  useEffect(() => {
    return attachThemeMediaListener(setTheme);
  }, []);

  const setAppTheme = useCallback((value: Theme) => setTheme(value), []);
  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [],
  );

  return {
    theme,
    setTheme: setAppTheme,
    toggleTheme,
  };
}
