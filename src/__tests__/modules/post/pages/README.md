# Post Pages Tests

## Test Coverage

- ✅ `PostsPage` - loading/error states, search wiring, list rendering, refresh/retry controls, navigation, and aria labels
- ✅ `PostDetailPage` - invalid-id guard, loading/error/empty branches, comment state handling, refresh badge, back navigation, and label generation

## Test Structure

1. **Positive Cases** - standard loading/render flows for posts and post detail views
2. **Negative Cases** - initial load failures, invalid IDs, and comment fetch errors
3. **Edge Cases** - empty filtered results, empty comments, fallback error messages, and limited display counts
4. **Critical Value Assertions** - retry/refetch invocations, navigation targets, aria/status messaging, and label callbacks
5. **Theory-based Tests** - deterministic branching for query states and derived UI flags

## Test Categories

### Page-level states

- Loading skeletons, error fallbacks (with and without error messages), empty states, and refresh banners
- Comment-state branches (loading, error, empty, populated) with label generation

### Interaction routing

- Search/selection navigation to detail pages
- Back/retry/refetch callbacks triggered from UI actions and mobile/desktop contexts

## Mocking Strategy

### Hooks

- `usePostsPageVM` / `usePostDetailVM` - mocked to inject deterministic query states and handlers

### Components

- Post/detail subcomponents (`PostSearch`, `PostList`, skeletons, comment components) stubbed for prop inspection and label execution

### Routing

- `useNavigate` - mocked to capture navigation targets without changing history

### Contexts

- `useI18n` - mocked translations for labels and interpolated copy

## Running Tests

### Commands

```bash
# Run all tests
pnpm test

# Run only post page tests
pnpm test -- src/__tests__/modules/post/pages/

# Run specific function tests
pnpm test -- src/__tests__/modules/post/pages/posts-page.test.tsx

# Run with coverage
pnpm run test:coverage

# Run in watch mode
pnpm run test:watch
```

## Test Results

All tests should pass, verifying:

- ✅ Skeletons/errors render for loading/failure states with retry hooks wired (including fallback messaging)
- ✅ Empty-search/comments branches surface the correct messaging and labels
- ✅ Navigation triggers (post selection/back) call the expected handlers with aria labels
- ✅ Refresh and limited-count banners appear when flagged by view models

## Key Testing Concepts

### Branch completeness

Exercising every query-state branch to guarantee deterministic UI across loading, error, and empty conditions.

### Interaction-to-side-effect mapping

Confirming buttons/links invoke navigation or refetch handlers without relying on network calls and still emit accessibility labels.

## Dependencies

- **Jest** - test runner and assertions
- **@testing-library/react** - render and interaction utilities
- **@testing-library/jest-dom** - DOM matchers
