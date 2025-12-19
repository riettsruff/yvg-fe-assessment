import { en } from './en';
import { id } from './id';
import type { TranslationsSchema } from './types';

export const locales = {
  en,
  id,
} as const satisfies Record<'en' | 'id', TranslationsSchema>;

export type Locale = keyof typeof locales;

export type Translations = typeof en;
export type LocaleTranslations = TranslationsSchema;

export type NestedPaths<T, Prefix extends string = ''> = T extends string
  ? Prefix
  : {
      [K in Extract<keyof T, string>]: NestedPaths<T[K], Prefix extends '' ? K : `${Prefix}.${K}`>;
    }[Extract<keyof T, string>];

export type PathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

export type ExtractParams<S> = S extends `${string}{${infer Param}}${infer Rest}`
  ? Param | ExtractParams<Rest>
  : never;

export type TranslationKey = NestedPaths<Translations>;
export type TranslationParams<K extends TranslationKey> =
  ExtractParams<PathValue<Translations, K>> extends never
    ? undefined
    : Record<ExtractParams<PathValue<Translations, K>>, string | number>;
