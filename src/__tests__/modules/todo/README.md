# Todo Module Tests

## Test Coverage

- ✅ `filterTodos` - filtering logic across all filter types
- ✅ `computeTodoStats` - aggregate counts and progress percentage calculations
- ✅ `loadTodosFromStorage` / `persistTodosToStorage` - storage hydration and persistence safeguards
- ✅ `todos-slice` reducers - add, toggle, delete, filter, hydrate behaviors including initial load
- ✅ `useTodosPageVM` - view-model wiring, derived data, dispatch mapping, and navigation side effects
- ✅ `Todo Components` - form, filter tabs, item, and list behaviors including empty states
- ✅ `TodosPage` - header, progress, add/reset flow, filter/list wiring, labels, and scroll behavior

## Test Structure

1. **Positive Cases** - standard filtering, stats calculations, reducer updates, and UI renders
2. **Negative Cases** - missing todos, invalid IDs, storage failures, undefined windows, and POP navigation
3. **Edge Cases** - empty lists, repeated dispatches, persisted data hydration, and trimming inputs
4. **Critical Value Assertions** - correct counts, action payloads, aria attributes, state immutability, and callback payloads
5. **Theory-based Tests** - deterministic reducer outcomes, derived state stability, and placeholder/aria calculations

## Test Categories

### Model helpers

- Filtering per `all`/`completed`/`pending`
- Aggregate stats including progress percentage

### Persistence

- LocalStorage hydration and parse failure fallbacks
- Write operations and error swallowing to keep UI stable

### State management

- Reducer behaviors for add/toggle/delete/filter/hydrate
- Initial state hydration from stored todos

### View model

- Derived lists/stats from selector data
- Dispatch mapping for user actions and navigation-aware effects

### Components and page

- Form/input hygiene, filter tabs, item/list interactions, and empty states
- TodosPage wiring for add/reset, filters, progress, scroll behavior, and label helpers

## Mocking Strategy

### Browser APIs

- `localStorage` - simulate persisted todos and write failures
- `crypto.randomUUID` / `Date.now` - deterministic ID and timestamp generation

### React/Redux hooks

- `useAppDispatch` and `useAppSelector` - mocked to supply controlled state and capture dispatched actions
- `useNavigationType` - mocked for scroll behavior on TodosPage

### Module isolation

- `jest.doMock` with `jest.isolateModules` - force reducer initial state to use mocked storage
- Stubbed components (form/list/filter tabs) in page tests for prop inspection without Redux/store wiring

## Running Tests

### Commands

```bash
# Run all tests
pnpm test

# Run only todo module tests
pnpm test -- src/__tests__/modules/todo/

# Run specific function tests
pnpm test -- src/__tests__/modules/todo/model/helpers.test.ts

# Run with coverage
pnpm run test:coverage

# Run in watch mode
pnpm run test:watch
```

## Test Results

All tests should pass, verifying:

- ✅ Filters and stats remain correct for mixed todo states with deterministic progress values
- ✅ Storage interactions fail gracefully without throwing and hydrate initial state safely
- ✅ Reducer mutations apply only to targeted items and honor initial hydration
- ✅ View-model, components, and page expose derived data and callbacks correctly, including add/reset and scroll behavior with labels

## Key Testing Concepts

### Reducer determinism

Confirming predictable state transitions for each action and stable initialization from persisted data.

### Persistence resilience

Ensuring storage read/write operations never break the app flow, even under malformed data, and that UI flows trim/reset inputs appropriately.

## Dependencies

- **Jest** - test runner and assertions
- **@testing-library/react** - hook rendering and `act` utilities
- **@testing-library/jest-dom** - DOM matchers
- **@reduxjs/toolkit** - reducer action creators validated in expectations
