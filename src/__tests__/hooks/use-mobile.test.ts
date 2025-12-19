import { act, renderHook } from '@testing-library/react';

import { useIsMobile } from '@/hooks/use-mobile';

describe('useIsMobile', () => {
  const listeners: Array<() => void> = [];

  const setupViewport = (width: number) => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: width });
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: width < 768,
      media: query,
      onchange: null,
      addEventListener: jest.fn((_, handler) => listeners.push(handler)),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  };

  beforeEach(() => {
    listeners.length = 0;
  });

  it('returns true when width is below the mobile breakpoint', () => {
    setupViewport(500);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it('updates when the media query change event fires', () => {
    setupViewport(1024);
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 700 });
      listeners.forEach((listener) => listener());
    });

    expect(result.current).toBe(true);

    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 900 });
      listeners.forEach((listener) => listener());
    });

    expect(result.current).toBe(false);
  });
});
