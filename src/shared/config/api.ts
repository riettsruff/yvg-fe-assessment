const DEFAULT_JSON_PLACEHOLDER_BASE_URL = 'https://jsonplaceholder.typicode.com';

const getEnvBaseUrl = () => {
  if (typeof process !== 'undefined' && process.env?.VITE_JSON_PLACEHOLDER_BASE_URL) {
    return process.env.VITE_JSON_PLACEHOLDER_BASE_URL;
  }

  const globalEnv = (
    globalThis as unknown as {
      __APP_IMPORT_META_ENV__?: { VITE_JSON_PLACEHOLDER_BASE_URL?: string };
    }
  ).__APP_IMPORT_META_ENV__;

  return globalEnv?.VITE_JSON_PLACEHOLDER_BASE_URL;
};

export const resolveJsonPlaceholderBaseUrl = (env?: { VITE_JSON_PLACEHOLDER_BASE_URL?: string }) =>
  env?.VITE_JSON_PLACEHOLDER_BASE_URL || getEnvBaseUrl() || DEFAULT_JSON_PLACEHOLDER_BASE_URL;

export const jsonPlaceholderBaseUrl = resolveJsonPlaceholderBaseUrl();
