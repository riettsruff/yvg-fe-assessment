# Post Module Tests

## Test Coverage

- ✅ `postsKeys` - stable query key generation for lists, details, and comments
- ✅ `fetchPosts` / `fetchPostById` / `fetchCommentsByPostId` - API calls, schema validation, and error handling
- ✅ `usePostsPageVM` - search state, filtering, limiting, navigation side effects, and refetch wiring
- ✅ `usePostDetailVM` - parameter parsing, query orchestration, navigation, retry logic, and invalid guards
- ✅ `Post Components` - cards, lists, search, comments, and skeleton/empty/loading render states
- ✅ `Post Pages` (`PostsPage`, `PostDetailPage`) - loading/error/empty branches, refresh banners, navigation, and comment state handling

## Test Structure

1. **Positive Cases** - successful fetch flows, search handling, navigation with history, and standard renders
2. **Negative Cases** - HTTP failures, schema validation errors, invalid IDs, and comment/post query errors
3. **Edge Cases** - search trimming, limit enforcement, empty comments/posts, SSR fallbacks, and history length fallbacks
4. **Critical Value Assertions** - correct URLs, query keys, refetch invocations, aria/status flags, and navigation targets
5. **Theory-based Tests** - deterministic filtering/limiting, refresh-state computation, and placeholder counts/delays

## Test Categories

### API and query keys

- Service calls with schema validation and error paths
- Stable key generation for list/detail/comments queries

### View models

- Posts page view model: search hydration, scroll behavior, and limit enforcement
- Post detail view model: ID parsing, retry/back navigation, invalid guards, and query enabling

### Components

- Cards, lists, search bar, comments, and skeleton placeholders with aria labels
- Loading/empty states and SR-only messaging for post/comment UIs

### Pages

- PostsPage: loading/error/empty flows, refresh banners, navigation to detail, and label callbacks
- PostDetailPage: invalid-id guard, comment state branches, refresh indicator, and back handling

## Mocking Strategy

### Network and libraries

- `fetch` - mocked for API responses and schema failures
- `@tanstack/react-query` - mocked `useQuery` to inject deterministic query states and invoke queryFns

### Routing

- `react-router-dom` - mocked `useSearchParams`, `useNavigationType`, `useParams`, `useNavigate` for navigation scenarios and selection actions

### UI/Contexts

- `useI18n` - mocked translations for aria labels and messages in components/pages
- Component stubs (search/list/skeletons/comments) to capture props without network calls

## Running Tests

### Commands

```bash
# Run all tests
pnpm test

# Run only post module tests
pnpm test -- src/__tests__/modules/post/

# Run specific function tests
pnpm test -- src/__tests__/modules/post/api/service.test.ts

# Run with coverage
pnpm run test:coverage

# Run in watch mode
pnpm run test:watch
```

## Test Results

All tests should pass, verifying:

- ✅ Correct query keys and API URLs are produced with schema-safe parsing and failure handling
- ✅ Search/limit behavior and navigation side effects behave as expected across history states
- ✅ Invalid IDs and comment/post errors trigger proper fallbacks and retries with accessible messaging
- ✅ Component/page UIs render expected placeholders, labels, and invoke callbacks deterministically

## Key Testing Concepts

### Query-driven state

Validating view models that depend on asynchronous query states while remaining deterministic in tests.

### Navigation-aware behavior

Ensuring side effects differ correctly between POP navigation and forward navigation flows, and selection routes to the right detail page with labels.

## Dependencies

- **Jest** - test runner and assertions
- **@testing-library/react** - hook rendering and interaction utilities
- **@testing-library/jest-dom** - DOM matchers
- **@tanstack/react-query** - mocked query hooks for view models
