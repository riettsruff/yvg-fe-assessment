import { act, renderHook } from '@testing-library/react';

import { LocaleProvider, __testUtils, useI18n } from '@/contexts/locale-context';
import { locales } from '@/locales';

describe('LocaleContext', () => {
  const originalNavigatorLanguage = navigator.language;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = '';
  });

  afterEach(() => {
    if (typeof navigator !== 'undefined') {
      Object.defineProperty(navigator, 'language', {
        value: originalNavigatorLanguage,
        configurable: true,
      });
    }
  });

  it('throws when used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useI18n())).toThrow(
      'useI18n must be used within a LocaleProvider',
    );
    consoleSpy.mockRestore();
  });

  it('initializes from storage, applies document lang, and toggles locale', () => {
    localStorage.setItem('locale', 'id');
    const { result } = renderHook(() => useI18n(), { wrapper: LocaleProvider });

    expect(result.current.locale).toBe('id');
    expect(document.documentElement.lang).toBe('id');

    act(() => result.current.toggleLocale());
    expect(result.current.locale).toBe('en');
    expect(localStorage.getItem('locale')).toBe('en');
    expect(document.documentElement.lang).toBe('en');

    act(() => result.current.toggleLocale());
    expect(result.current.locale).toBe('id');
  });

  it('prefers browser language when storage is missing or invalid', () => {
    Object.defineProperty(navigator, 'language', {
      value: 'id-ID',
      configurable: true,
    });
    localStorage.setItem('locale', 'fr');

    const { result } = renderHook(() => useI18n(), { wrapper: LocaleProvider });
    expect(result.current.locale).toBe('id');
  });

  it('falls back to default locale when browser language is not Indonesian', () => {
    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      configurable: true,
    });
    const { result } = renderHook(() => useI18n(), { wrapper: LocaleProvider });

    expect(result.current.locale).toBe('en');
  });

  it('translates keys with params and falls back to key when missing', () => {
    const { result } = renderHook(() => useI18n(), { wrapper: LocaleProvider });

    expect(result.current.t('common.footer', { year: 2030 })).toContain('2030');
    expect(result.current.t('postDetail.commentLabel', { id: 5 })).toContain('5');
    expect(result.current.t('non.existing.key')).toBe('non.existing.key');

    act(() => result.current.setLocale('id'));
    expect(result.current.t('postDetail.commentLabel', { id: 2 })).toContain('2');
    expect(result.current.locale).toBe('id');
  });

  it('persists locale changes to storage', () => {
    const originalStorage = (global as any).localStorage;
    const mockStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };

    Object.defineProperty(global, 'localStorage', { value: mockStorage, configurable: true });

    try {
      const { result } = renderHook(() => useI18n(), { wrapper: LocaleProvider });

      expect(result.current.locale).toBe('en');
      expect(document.documentElement.lang).toBe('en');
      expect(mockStorage.setItem).toHaveBeenCalledWith('locale', 'en');
    } finally {
      Object.defineProperty(global, 'localStorage', { value: originalStorage, configurable: true });
    }
  });

  it('leaves missing template params untouched', () => {
    const { result } = renderHook(() => useI18n(), { wrapper: LocaleProvider });

    expect(result.current.t('postDetail.commentLabel' as any)).toBe('Comment #{id}');
  });

  it('handles missing params even when an incomplete params object is provided', () => {
    const { result } = renderHook(() => useI18n(), { wrapper: LocaleProvider });

    expect(result.current.t('common.language.toggle' as any, { language: undefined } as any)).toBe(
      'Switch language to {language}',
    );
  });

  it('falls back to default locale data when current locale messages are missing', () => {
    const originalIdLocale = locales.id;
    const { result } = renderHook(() => useI18n(), { wrapper: LocaleProvider });

    (locales as any).id = undefined;

    act(() => result.current.setLocale('id'));
    expect(result.current.t('postDetail.commentLabel', { id: 7 })).toBe('Comment #7');

    (locales as any).id = originalIdLocale;
  });

  it('resolves default locale when window is undefined via helper', () => {
    const windowSpy = jest.spyOn(global as any, 'window', 'get').mockReturnValue(undefined as any);

    expect(__testUtils.getInitialLocale()).toBe('en');
    windowSpy.mockRestore();
  });
});
