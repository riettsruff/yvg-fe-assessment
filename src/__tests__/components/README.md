# Components Tests

## Test Coverage

- ✅ `LanguageToggle` - locale labels, aria metadata, and toggle handler wiring
- ✅ `ThemeToggle` - icon/state rendering and toggle callbacks across themes
- ✅ `Layout` - navigation states, header sizing fallbacks, mobile menu behavior, and footer metadata
- ✅ `NavLink` - class merging for active/pending states and ref forwarding
- ✅ `ErrorState` - alert semantics, retry action wiring, and messaging defaults
- ✅ `LoadingState` - status semantics, default/custom messages, and SR-only alt text
- ✅ `EmptyState` - aria-label composition, icon fallback, and action rendering

## Test Structure

1. **Positive Cases** - render expected UI with translations, icons, and children
2. **Negative Cases** - handle missing data gracefully (e.g., absent description, inactive menu)
3. **Edge Cases** - viewport/SSR header sizing, mobile menu link selection, and focus helpers
4. **Critical Value Assertions** - aria attributes, inline style tokens, and retry/action handlers
5. **Theory-based Tests** - deterministic class merging and placeholder counts

## Test Categories

### Accessibility and semantics

- Skip links, aria-current/labels, status/alert roles, and SR-only messaging
- Header height CSS variable propagation and footer text rendering

### Interaction wiring

- Mobile menu open/close including nav link selection
- Language/theme toggle callbacks and button/icon switching

## Mocking Strategy

### Contexts and hooks

- `useI18n` - mocked to control translated labels and footer text
- `LanguageToggle` / `ThemeToggle` - stub components to isolate layout behavior

### Routing and DOM

- `react-router-dom` - mocked navigation hooks for deterministic paths
- `ResizeObserver` and viewport width - overridden to exercise layout fallbacks

### Icons

- `lucide-react` - provided via Jest setup to avoid SVG dependency noise

## Running Tests

### Commands

```bash
# Run all tests
pnpm test

# Run only components tests
pnpm test -- src/__tests__/components/

# Run specific function tests
pnpm test -- src/__tests__/components/layout.test.tsx

# Run with coverage
pnpm run test:coverage

# Run in watch mode
pnpm run test:watch
```

## Test Results

All tests should pass, verifying:

- ✅ Full coverage across layout, toggles, status components, and nav links
- ✅ Aria labels/styles update for active nav, skip link, and footer metadata
- ✅ Mobile menu toggles, closes on link selection, and honors SSR/viewport sizing
- ✅ Default and custom icons/actions render predictably for empty/error/loading states

## Key Testing Concepts

### Accessibility-first assertions

Ensuring components expose correct roles, aria metadata, and keyboard-friendly skip links while keeping screen-reader cues intact.

### Deterministic styling and layout

Validating class merging and CSS variable updates remain stable across desktop/mobile and SSR scenarios.

## Dependencies

- **Jest** - test runner and assertions
- **@testing-library/react** - rendering and interaction helpers
- **@testing-library/jest-dom** - DOM matchers
- **react-router-dom** - router primitives mocked for navigation-aware components
