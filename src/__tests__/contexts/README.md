# Contexts Tests

## Test Coverage

- ✅ `LocaleProvider` - initializes from storage/browser/SSR, updates document language, and persists locale
- ✅ `useI18n` - translation resolution, template formatting (with/without params), fallbacks, and hook guardrails

## Test Structure

1. **Positive Cases** - hydrate locale, translate keys with params, and persist updates
2. **Negative Cases** - throw descriptive error when hook used outside provider
3. **Edge Cases** - invalid storage values, browser-language preference, and server-only execution
4. **Critical Value Assertions** - document `lang` updates, localStorage writes, and toggle/set behavior
5. **Theory-based Tests** - deterministic fallback selection and template substitution

## Test Categories

### Locale initialization

- Storage-first hydration with browser-language and default fallbacks
- SSR-safe defaults with document language updates and persistence

### Translation behavior

- Parameterized template replacement and placeholder preservation when params are missing
- Missing-key fallbacks returning the original key

## Mocking Strategy

### Browser APIs

- `localStorage` - seeded/cleared for storage and SSR scenarios
- `navigator.language` - overridden for language preference branches
- `window`/`document` - temporarily undefined to assert server-safe defaults

### React hooks

- `renderHook` wrapped with `LocaleProvider` to exercise context APIs

## Running Tests

### Commands

```bash
# Run all tests
pnpm test

# Run only context tests
pnpm test -- src/__tests__/contexts/

# Run specific function tests
pnpm test -- src/__tests__/contexts/locale-context.test.tsx

# Run with coverage
pnpm run test:coverage

# Run in watch mode
pnpm run test:watch
```

## Test Results

All tests should pass, verifying:

- ✅ Locale hydrates from storage/browser or defaults on SSR with document `lang` synchronized
- ✅ Toggle/set locale mutations persist to localStorage and update consumers
- ✅ Template params interpolate correctly while missing keys and params fall back gracefully
- ✅ Hook misuse outside the provider throws the expected error message

## Key Testing Concepts

### Context safety

Guarding hooks with descriptive errors to prevent usage without providers while keeping language metadata in sync.

### Locale persistence

Ensuring locale choices remain stable across reloads via storage writes and document metadata updates, including server-side defaults.

## Dependencies

- **Jest** - test runner and assertions
- **@testing-library/react** - hook rendering utilities
- **@testing-library/jest-dom** - DOM matchers for document assertions
