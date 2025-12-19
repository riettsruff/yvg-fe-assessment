# YVG FE Assessment

A Vite + React + TypeScript hub that pairs a todo manager with a JSONPlaceholder posts explorer. Includes responsive layouts, bilingual copy (EN/ID), light/dark themes, and prebuilt shadcn/ui-style components.

## Features

- Todo manager with add, toggle, and delete actions, filter tabs (all/pending/completed), completion progress, and keyboard-friendly controls persisted to localStorage via Redux Toolkit.
- Posts explorer powered by JSONPlaceholder: fetch 100 posts, search by numeric ID (synced to the URL), cap the list to 20 items for readability, and open details to view bodies and comments with skeleton/loading/error/empty states plus refresh indicators.
- Data layer with TanStack Query caching, Zod validation for API responses, and explicit retry handlers for failure cases.
- UI/UX polish: responsive layout, keyboard “skip to main content” link for accessibility, subtle animated cards, empty/error components, and accessible navigation with mobile drawer, theme toggle, and language toggle (EN/ID) persisted between visits.
- Ready-to-use UI primitives (buttons, inputs, tabs, toasts) styled with Tailwind, Radix primitives, lucide-react icons, and Sonner/shadcn toasters.

## Tech Stack

- React 18, TypeScript, Vite
- Tailwind CSS, shadcn/ui patterns, Radix Primitives, lucide-react
- React Router 6, TanStack Query 5, Redux Toolkit
- Zod for schema validation
- Jest + Testing Library for tests
- pnpm + Volta (Node 24.11.1 pinned)
- Docker + Docker Compose, Make/Batch helpers

## Prerequisites

- Node.js 18+ (Volta pins 24.11.1)
- pnpm
- Docker (optional, for containerized workflows)
- make or `make.bat` (optional convenience)

## Quick Start

### With Make/Batch (recommended)

Works on Windows, macOS, and Linux:

```bash
make install   # or make.bat install
make dev       # or make.bat dev
```

Then open http://localhost:5173.

### With pnpm directly

```bash
pnpm install
pnpm run dev
pnpm run build
pnpm run build:dev
pnpm run preview
pnpm run lint
pnpm run lint:fix
pnpm run typecheck
pnpm run format
pnpm run format:write
pnpm run test
pnpm run test:watch
pnpm run test:coverage
```

## Available Commands

From `Makefile` / `make.bat`:

- install | update | deps-check
- dev | build | build-dev | preview
- lint | lint-fix | typecheck | format | format-write | check | ci | info
- test | test-watch | test-coverage
- clean | dist-clean | setup
- docker-dev | docker-prod | docker-build | docker-build-dev | docker-serve
- docker-stop | docker-clean | docker-logs | docker-shell-dev | docker-shell-prod

## Docker

- Development: `make docker-dev` (binds Vite dev server to 5173)
- Production: `make docker-prod` (serves built app on 8081 via nginx stage)
- Static serve profile: `make docker-serve` (build stage + nginx on 8084)
- Shell/logs: `make docker-shell-dev`, `make docker-shell-prod`, `make docker-logs`

## Environment

- Copy `.env.example` to `.env.development` (local dev) and `.env.production` (build/serve) before running commands. Keep both files in sync with any new variables.
- `VITE_JSON_PLACEHOLDER_BASE_URL`: base URL for posts/comments API. The sample uses `https://jsonplaceholder.typicode.com`; override it to point at another backend or a local/mock server as needed.

## Project Structure

```
src/
  app/                # App providers (Redux, React Query, theme/toast), router, store
  components/         # Layout, core UI primitives, theme/language toggles, states
  contexts/           # Locale provider + translation helper
  hooks/              # App-level hooks (typed dispatch/selectors)
  locales/            # Translation resources (EN/ID dictionaries)
  modules/
    todo/             # Todo slice, hooks, components, and localStorage persistence
    post/             # JSONPlaceholder API client, hooks, components for posts/comments
  pages/              # Route entrypoints for todos, posts, post detail, 404
  shared/             # Shared config (API base URL)
  utils/              # Helpers (className merging, etc.)
  __tests__/          # Jest + RTL coverage across modules/components/helpers
public/               # Static assets
Dockerfile            # Multi-stage build (builder, production, development)
docker-compose.yaml   # Compose profiles for dev/prod/serve
Makefile / make.bat   # Task runners for Unix/Windows
eslint.config.js      # ESLint setup
tailwind.config.ts    # Tailwind configuration
jest.config.cjs       # Jest configuration
tsconfig*.json        # TypeScript configs (root/app/node)
vite.config.ts        # Vite configuration
package.json          # Scripts and dependencies
pnpm-lock.yaml        # Locked dependency graph
```

## Testing

Run the suite:

```bash
pnpm run test          # or make test
pnpm run test:watch    # watch mode
pnpm run test:coverage # coverage
```
