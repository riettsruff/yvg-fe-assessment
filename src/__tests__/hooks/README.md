# Hooks Tests

## Test Coverage

- ✅ `useTheme` and helpers - stored/system preference resolution, SSR/document guards, toggles, and explicit setters
- ✅ `useIsMobile` - responsive breakpoint detection and media listener updates
- ✅ `useToast` / `reducer` - toast lifecycle, update/dismiss branches, timers, reset helper, and removal queue

## Test Structure

1. **Positive Cases** - standard hook flows with expected state and DOM side effects
2. **Negative Cases** - guard rails for missing environments or stored overrides preventing updates
3. **Edge Cases** - SSR-safe theme defaults, media query change handling, and timer deduplication
4. **Critical Value Assertions** - document class/color-scheme updates, toast open state, and branch coverage for update/dismiss paths
5. **Theory-based Tests** - deterministic state transitions across repeated render cycles and listener callbacks

## Test Categories

### Theme management

- Stored vs. system preference resolution and toggle/set behavior
- Document class/style updates plus SSR/document undefined safety

### Responsive detection

- Initial breakpoint evaluation and listener-driven updates

### Toast lifecycle

- Addition cap enforcement, update/dismiss branches, timers, and reset clearing listeners/queues

## Mocking Strategy

### DOM and browser APIs

- `matchMedia` and media query listeners - simulate system preference and viewport changes
- `localStorage` - emulate persisted theme values, including SSR-safe stubs
- `setTimeout` with fake timers - control toast removal scheduling and cleanup

### Module isolation

- `jest.isolateModules` / module mocks - reset toast module state and avoid cross-test leakage

## Running Tests

### Commands

```bash
# Run all tests
pnpm test

# Run only hooks tests
pnpm test -- src/__tests__/hooks/

# Run specific function tests
pnpm test -- src/__tests__/hooks/use-theme.test.ts

# Run with coverage
pnpm run test:coverage

# Run in watch mode
pnpm run test:watch
```

## Test Results

All tests should pass, verifying:

- ✅ Stored/system theme resolution, SSR guards, and document class updates remain consistent
- ✅ Breakpoint detection reacts to media query changes with listener hygiene
- ✅ Toasts honor limits, update safely across matching/non-matching ids, dismiss via events, and reset clears timers/listeners
- ✅ Timer queue deduplication prevents duplicate removal scheduling

## Key Testing Concepts

### React hook state determinism

Ensuring hooks respond predictably to state updates, effects, and external events across rerenders.

### Timer and listener hygiene

Validating timers and event listeners are scheduled once, cleaned up correctly, and resilient to stored overrides.

## Dependencies

- **Jest** - test runner and assertions
- **@testing-library/react** - renderHook utilities and `act`
- **@testing-library/jest-dom** - DOM matchers
