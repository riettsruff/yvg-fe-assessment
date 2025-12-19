import '@testing-library/jest-dom';
import React from 'react';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: ResizeObserverMock,
});

if (!window.scrollTo) {
  window.scrollTo = jest.fn();
}

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = jest.fn();
}

jest.mock(
  'lucide-react',
  () =>
    new Proxy(
      {},
      {
        get: (_target, prop) => (props: React.ComponentProps<'svg'>) =>
          React.createElement('svg', { 'data-icon': String(prop), ...props }),
      },
    ),
);

jest.mock('sonner', () => {
  const toast = {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  };

  return {
    toast,
    Toaster: ({ children }: { children?: React.ReactNode }) =>
      React.createElement('div', { 'data-testid': 'mock-sonner' }, children),
  };
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});
