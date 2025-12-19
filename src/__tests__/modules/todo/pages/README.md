# Todo Pages Tests

## Test Coverage

- ✅ `TodosPage` - header rendering, navigation side effects, add/reset flow, filtering, progress bar, list wiring, and accessibility labels

## Test Structure

1. **Positive Cases** - standard render with empty and populated todo lists
2. **Negative Cases** - no-scroll behavior on POP navigation and empty list fallbacks
3. **Edge Cases** - trimming new tasks, progress calculations, and filter toggling
4. **Critical Value Assertions** - aria-valuenow progress attributes, handler payloads, and input reset behavior
5. **Theory-based Tests** - deterministic derived state across filter and navigation scenarios

## Test Categories

### Add and reset flow

- New task submission trims text, calls add, and clears input
- Scroll-to-top behavior for non-POP navigation

### Filtering and progress

- Filter changes routed through `setFilter`
- Progress bar exposes correct aria values from stats

### List interactions

- Toggle/delete handlers receive correct IDs with label helpers exercised
- Empty vs. filtered-empty states surface proper descriptions

## Mocking Strategy

### Hooks

- `useTodosPageVM` - mocked to inject deterministic items, stats, and handlers

### Routing

- `useNavigationType` - mocked to simulate POP vs. forward navigation for scroll assertions

### Components

- `TodoForm`, `TodoFilterTabs`, and `TodoList` stubbed to capture props, label helpers, and trigger callbacks without Redux/store dependencies

### Contexts

- `useI18n` - mocked translations for labels and progress text

## Running Tests

### Commands

```bash
# Run all tests
pnpm test

# Run only todo page tests
pnpm test -- src/__tests__/modules/todo/pages/

# Run specific function tests
pnpm test -- src/__tests__/modules/todo/pages/todos-page.test.tsx

# Run with coverage
pnpm run test:coverage

# Run in watch mode
pnpm run test:watch
```

## Test Results

All tests should pass, verifying:

- ✅ Add flow trims input, calls add, clears field, and scrolls when appropriate
- ✅ Filters and list callbacks receive correct IDs and labels with progress aria values set
- ✅ Empty and filtered-empty paths return the right descriptions and helper labels
- ✅ Navigation type differences preserve/skip scroll behavior deterministically

## Key Testing Concepts

### Derived view-model state

Confirming component rendering and handlers align with VM-provided stats and filtered lists.

### Navigation-aware side effects

Ensuring scroll behavior only triggers on non-POP navigation types while callbacks remain stable.

## Dependencies

- **Jest** - test runner and assertions
- **@testing-library/react** - render and interaction helpers
- **@testing-library/jest-dom** - DOM matchers
