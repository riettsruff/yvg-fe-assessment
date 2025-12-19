# Shared Config Tests

## Test Coverage

- ✅ `resolveJsonPlaceholderBaseUrl` - prioritizes provided env overrides, process env, global import meta env, and safe default fallback
- ✅ `jsonPlaceholderBaseUrl` - exports the runtime-resolved base URL for API calls

## Test Structure

1. **Positive Cases** - uses supplied environment values when present
2. **Negative Cases** - defaults correctly when overrides are absent or empty
3. **Edge Cases** - handles undefined global/process environments without throwing
4. **Critical Value Assertions** - ensures correct base URL is returned for downstream API usage
5. **Theory-based Tests** - deterministic resolution order (explicit env > process env > global env > default)

## Test Categories

### Environment resolution

- Custom base URL overrides via provided env objects, process env, and global import meta env
- Default fallback behavior to JSONPlaceholder when overrides are missing

### Safety checks

- Module reloading with isolated environments to validate resolution order
- Export consistency for runtime constant

## Mocking Strategy

### Environment injection

- `process.env` mutations wrapped with `jest.isolateModules` to recompute exports
- `global.__APP_IMPORT_META_ENV__` overrides to simulate bundler-provided env

## Running Tests

### Commands

```bash
# Run all tests
pnpm test

# Run only shared config tests
pnpm test -- src/__tests__/shared/config/

# Run specific function tests
pnpm test -- src/__tests__/shared/config/api.test.ts

# Run with coverage
pnpm run test:coverage

# Run in watch mode
pnpm run test:watch
```

## Test Results

All tests should pass, verifying:

- ✅ Environment overrides are honored in the correct priority order
- ✅ Default JSONPlaceholder URL is used when overrides are missing or empty
- ✅ Runtime export mirrors the resolved configuration for the active environment
- ✅ Module reloads remain deterministic under varying env inputs

## Key Testing Concepts

### Configuration fallbacks

Guaranteeing sane defaults when runtime configuration is missing or malformed across environments.

### Deterministic resolution

Ensuring the same inputs always lead to the same resolved base URL regardless of load order.

## Dependencies

- **Jest** - test runner and assertions
