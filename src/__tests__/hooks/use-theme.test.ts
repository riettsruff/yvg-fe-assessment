import { act, renderHook } from '@testing-library/react';

import { __testUtils, useTheme } from '@/hooks/use-theme';

describe('useTheme', () => {
  const mediaListeners: Array<(event: MediaQueryListEvent) => void> = [];

  const mockMatchMedia = (matches: boolean) => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: jest.fn((_, handler) => mediaListeners.push(handler)),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  };

  beforeEach(() => {
    mediaListeners.length = 0;
    localStorage.clear();
    document.documentElement.className = '';
    document.documentElement.style.colorScheme = '';
  });

  it('initializes using stored theme and applies it to the document', () => {
    localStorage.setItem('theme', 'dark');
    mockMatchMedia(false);

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    act(() => result.current.toggleTheme());

    expect(result.current.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);

    act(() => {
      mediaListeners.forEach((listener) => listener({ matches: true } as MediaQueryListEvent));
    });

    expect(result.current.theme).toBe('light');

    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('dark');
  });

  it('prefers system theme when no stored value and reacts to changes', () => {
    mockMatchMedia(true);

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('dark');

    act(() => {
      localStorage.removeItem('theme');
      mediaListeners.forEach((listener) => listener({ matches: false } as MediaQueryListEvent));
    });

    expect(result.current.theme).toBe('light');
    expect(document.documentElement.style.colorScheme).toBe('light');

    act(() => {
      localStorage.removeItem('theme');
      mediaListeners.forEach((listener) => listener({ matches: true } as MediaQueryListEvent));
    });

    expect(result.current.theme).toBe('dark');
  });

  it('allows setting theme explicitly', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useTheme());

    act(() => result.current.setTheme('dark'));

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe('dark');
  });

  it('defaults to light theme when window is unavailable', () => {
    expect(__testUtils.getPreferredTheme(null as any)).toBe('light');

    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
  });

  it('exposes helpers for server-safe theme resolution', () => {
    expect(__testUtils.resolveWindow(null as any)).toBeUndefined();
    expect(__testUtils.getDocumentElement(null as any)).toBeNull();

    const windowGetter = jest.spyOn(global, 'window', 'get').mockReturnValue(undefined as any);
    const documentGetter = jest.spyOn(global, 'document', 'get').mockReturnValue(undefined as any);
    expect(__testUtils.resolveWindow()).toBeUndefined();
    expect(__testUtils.getDocumentElement()).toBeNull();
    windowGetter.mockRestore();
    documentGetter.mockRestore();

    const documentSpy = jest.spyOn(__testUtils, 'getDocumentElement').mockReturnValue(null as any);
    expect(() => __testUtils.applyThemeToDocument('dark', null as any)).not.toThrow();
    documentSpy.mockRestore();

    expect(__testUtils.attachThemeMediaListener(jest.fn(), null as any)).toBeUndefined();
  });
});
