# Utils Tests

## Test Coverage

- ✅ `cn` - merges class names, resolves Tailwind conflicts, and ignores falsy inputs

## Test Structure

1. **Positive Cases** - merges multiple class values and keeps the expected result
2. **Negative Cases** - ignores falsy/empty inputs without throwing
3. **Edge Cases** - resolves Tailwind conflicts and duplicate classes predictably
4. **Critical Value Assertions** - preserves merge priority for styling correctness
5. **Theory-based Tests** - validates deterministic merging for Tailwind utility precedence

## Test Categories

### Class merging

- Conflict resolution between Tailwind utilities
- Preservation of non-conflicting classes

### Input robustness

- Handling of nullish and false values
- Empty string handling without extra whitespace

## Mocking Strategy

### Pure functions

- No external dependencies are mocked; tests rely on direct function output

## Running Tests

### Commands

```bash
# Run all tests
pnpm test

# Run only utils tests
pnpm test -- src/__tests__/utils/

# Run specific function tests
pnpm test -- src/__tests__/utils/cn.test.ts

# Run with coverage
pnpm run test:coverage

# Run in watch mode
pnpm run test:watch
```

## Test Results

All tests should pass, verifying:

- ✅ Conflict resolution keeps the latest Tailwind utility
- ✅ Falsy inputs are ignored without altering output
- ✅ Output strings remain trimmed and deterministic
- ✅ Class lists preserve necessary styling tokens

## Key Testing Concepts

### Tailwind merge precedence

Ensuring later utilities override earlier conflicting classes for predictable styling.

### Falsy input handling

Confirming class concatenation skips invalid values to avoid noise in the final class list.

## Dependencies

- **Jest** - test runner and assertions
- **@testing-library/react** - render utilities for potential hook tests in this area
