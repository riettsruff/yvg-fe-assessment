# Post Components Tests

## Test Coverage

- ✅ `CommentsList` / `CommentsEmptyIllustration` - comment rendering, labels, and illustration fallback
- ✅ `CommentsSkeleton` - loading placeholders, SR-only loading label, and default export parity
- ✅ `PostCard` - post content display, animation delay, and selection callback
- ✅ `PostDetailSkeleton` - article/comments skeleton placeholders, status messaging, and default export parity
- ✅ `PostList` - list wiring, aria labels, and selection forwarding
- ✅ `PostSearch` - search input behavior, keyboard submit, and hint/label wiring
- ✅ `PostsSkeleton` - list placeholders, loading-state messaging, and default export parity

## Test Structure

1. **Positive Cases** - render expected UI for comments/posts, search controls, and skeleton states
2. **Negative Cases** - empty/zero items handled without crashes or missing labels
3. **Edge Cases** - animation delays per index and search submission via Enter key
4. **Critical Value Assertions** - aria labels, status roles, callback invocations, and SR-only messaging
5. **Theory-based Tests** - deterministic counts for skeleton placeholders and class delays

## Test Categories

### Rendering and accessibility

- Lists render names/emails/bodies with correct aria attributes
- Skeletons and SR-only labels convey loading states with predictable counts

### Interaction wiring

- Button/Enter submits search with correct hints
- Post/comment selections invoke passed callbacks and expose aria labels

## Mocking Strategy

### Contexts

- `useI18n` - mocked for skeleton components needing translation defaults

### Icons and visuals

- `lucide-react` - globally mocked in Jest setup to avoid SVG dependency noise

### Component stubs

- Input/list wrappers stubbed to capture props without network calls

## Running Tests

### Commands

```bash
# Run all tests
pnpm test

# Run only post component tests
pnpm test -- src/__tests__/modules/post/components/

# Run specific function tests
pnpm test -- src/__tests__/modules/post/components/post-search.test.tsx

# Run with coverage
pnpm run test:coverage

# Run in watch mode
pnpm run test:watch
```

## Test Results

All tests should pass, verifying:

- ✅ Comments render with labels, delays, and illustration fallback when empty
- ✅ Search input fires change/Enter/button handlers with labels and hints intact
- ✅ Post cards/lists propagate aria labels and selection handlers deterministically
- ✅ Skeleton components render the expected number of placeholders and status text, including default exports

## Key Testing Concepts

### Status communication

Validating loading/empty states surface screen-reader-friendly messaging while keeping visuals deterministic.

### Deterministic layout cues

Ensuring animation delays and placeholder counts remain stable for predictable UX and testing.

## Dependencies

- **Jest** - test runner and assertions
- **@testing-library/react** - render and interaction helpers
- **@testing-library/jest-dom** - DOM matchers
