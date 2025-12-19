# Todo Components Tests

## Test Coverage

- ✅ `TodoFilterTabs` - counts, active state, aria attributes, and change handling
- ✅ `TodoForm` - input change, trimming on submit, disabled state, and hints
- ✅ `TodoItem` - toggle/delete actions, aria labels, and completed styling
- ✅ `TodoList` - empty states, label generation, and handler wiring for toggle/delete

## Test Structure

1. **Positive Cases** - render tabs/form/items with expected labels and actions
2. **Negative Cases** - empty lists and filtered-empty scenarios handled gracefully
3. **Edge Cases** - trimming inputs and per-item animation delays/index usage
4. **Critical Value Assertions** - aria-selected/pressed, disabled buttons, and callback payloads
5. **Theory-based Tests** - deterministic label generation and empty-state selection

## Test Categories

### Interaction wiring

- Filter tab changes and item toggle/delete callbacks
- Form submission trimming and disablement for blank input

### Empty and filtered states

- Empty-state descriptions for no todos vs. filtered-out todos
- Completed vs. pending visual/state differences

## Mocking Strategy

### Icons

- `lucide-react` - globally mocked for SVG placeholders in tests

### Context-free components

- No external data sources; tests rely on direct prop injection for deterministic assertions

## Running Tests

### Commands

```bash
# Run all tests
pnpm test

# Run only todo component tests
pnpm test -- src/__tests__/modules/todo/components/

# Run specific function tests
pnpm test -- src/__tests__/modules/todo/components/todo-form.test.tsx

# Run with coverage
pnpm run test:coverage

# Run in watch mode
pnpm run test:watch
```

## Test Results

All tests should pass, verifying:

- ✅ Filters show accurate counts/selection and emit change events
- ✅ Form trims input, disables on empty, and calls submit handler
- ✅ Items expose correct aria labels and invoke toggle/delete callbacks
- ✅ Lists render empty states or items with generated labels predictably

## Key Testing Concepts

### Input hygiene

Ensuring user input is trimmed and prevented from submitting when empty.

### State-driven rendering

Confirming the UI shifts between empty, filtered, and populated states without ambiguity.

## Dependencies

- **Jest** - test runner and assertions
- **@testing-library/react** - render and interaction helpers
- **@testing-library/jest-dom** - DOM matchers
