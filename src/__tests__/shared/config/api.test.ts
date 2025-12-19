import { jsonPlaceholderBaseUrl, resolveJsonPlaceholderBaseUrl } from '@/shared/config/api';

describe('jsonPlaceholderBaseUrl resolver', () => {
  it('returns a custom URL when environment value is provided', () => {
    const custom = resolveJsonPlaceholderBaseUrl({
      VITE_JSON_PLACEHOLDER_BASE_URL: 'https://custom.test',
    });

    expect(custom).toBe('https://custom.test');
  });

  it('falls back to the default URL when env is missing or empty', () => {
    expect(resolveJsonPlaceholderBaseUrl()).toBe('https://jsonplaceholder.typicode.com');
    expect(resolveJsonPlaceholderBaseUrl({ VITE_JSON_PLACEHOLDER_BASE_URL: '' })).toBe(
      'https://jsonplaceholder.typicode.com',
    );
  });

  it('exports the resolved runtime value for the current environment', () => {
    expect(jsonPlaceholderBaseUrl).toBe('https://jsonplaceholder.typicode.com');
  });

  it('prefers process env variables when present', () => {
    const originalEnv = process.env.VITE_JSON_PLACEHOLDER_BASE_URL;
    process.env.VITE_JSON_PLACEHOLDER_BASE_URL = 'https://env.test';
    jest.resetModules();

    jest.isolateModules(() => {
      const {
        resolveJsonPlaceholderBaseUrl: freshResolve,
        jsonPlaceholderBaseUrl: freshBase,
      } = require('@/shared/config/api');

      expect(freshResolve()).toBe('https://env.test');
      expect(freshBase).toBe('https://env.test');
    });

    process.env.VITE_JSON_PLACEHOLDER_BASE_URL = originalEnv;
    jest.resetModules();
  });

  it('uses global import meta env when available', () => {
    const originalGlobalEnv = (global as any).__APP_IMPORT_META_ENV__;
    const originalEnv = process.env.VITE_JSON_PLACEHOLDER_BASE_URL;
    delete process.env.VITE_JSON_PLACEHOLDER_BASE_URL;
    (global as any).__APP_IMPORT_META_ENV__ = {
      VITE_JSON_PLACEHOLDER_BASE_URL: 'https://global.test',
    };
    (globalThis as any).__APP_IMPORT_META_ENV__ = (global as any).__APP_IMPORT_META_ENV__;
    jest.resetModules();

    jest.isolateModules(() => {
      const { resolveJsonPlaceholderBaseUrl: freshResolve } = require('@/shared/config/api');
      expect(freshResolve()).toBe('https://global.test');
    });

    (global as any).__APP_IMPORT_META_ENV__ = originalGlobalEnv;
    (globalThis as any).__APP_IMPORT_META_ENV__ = originalGlobalEnv;
    process.env.VITE_JSON_PLACEHOLDER_BASE_URL = originalEnv;
    jest.resetModules();
  });
});
