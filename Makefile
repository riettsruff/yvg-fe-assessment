.PHONY: help install update deps-check dev build build-dev preview lint lint-fix typecheck format format-write test test-watch test-coverage clean dist-clean setup check ci info docker-build docker-build-dev docker-dev docker-prod docker-serve docker-stop docker-clean docker-logs docker-shell-dev docker-shell-prod serve start

help: ## Show this help message
	@echo 'Usage:'
	@echo '  make <target>'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST) 2>/dev/null || (echo "  install              Install dependencies" && echo "  dev                  Start development server" && echo "  build                Build the project")

install: ## Install dependencies
	pnpm install

update: ## Update dependencies
	pnpm update

deps-check: ## Check for outdated dependencies
	pnpm outdated

dev: ## Start development server
	pnpm run dev

build: ## Build the project for production
	pnpm run build

build-dev: ## Build the project for development mode
	pnpm run build:dev

preview: ## Preview production build locally
	pnpm run preview

lint: ## Run ESLint
	pnpm run lint

lint-fix: ## Run ESLint with auto-fix
	pnpm run lint:fix

typecheck: ## Run TypeScript type checking
	pnpm run typecheck

format: ## Check formatting with Prettier
	pnpm run format

format-write: ## Format code with Prettier (write changes)
	pnpm run format:write

test: ## Run test suite
	pnpm run test

test-watch: ## Run tests in watch mode
	pnpm run test:watch

test-coverage: ## Run tests with coverage
	pnpm run test:coverage

clean: ## Remove build and cache artifacts
	rm -rf dist .vite coverage

dist-clean: ## Remove build artifacts and dependencies
	rm -rf dist .vite coverage node_modules

setup: install ## Initial project setup
	@echo "Project setup complete."

check: lint typecheck test ## Run linting, type checks, and tests

ci: install check build ## Run CI pipeline locally

info: ## Show project information
	@echo "Project: app-penilaian-mahasiswa"
	@echo "Node version: $$(node --version)"
	@echo "PNPM version: $$(pnpm --version)"
	@echo "TypeScript version: $$(pnpm list typescript --depth=0 2>/dev/null | grep typescript || echo 'TypeScript not found')"
	@echo "Vite version: $$(pnpm list vite --depth=0 2>/dev/null | grep vite || echo 'Vite not found')"

docker-build: ## Build Docker image for production
	docker compose build app-penilaian-mahasiswa-prod

docker-build-dev: ## Build Docker image for development
	docker compose build app-penilaian-mahasiswa-dev

docker-dev: ## Run development server in Docker
	docker compose --profile dev up --build

docker-prod: ## Run production server in Docker
	docker compose --profile prod up --build

docker-serve: ## Build and serve with nginx
	docker compose --profile serve up --build

docker-stop: ## Stop all Docker containers
	docker compose down

docker-clean: ## Remove Docker containers, networks, and images
	docker compose down --rmi all --volumes --remove-orphans

docker-logs: ## View Docker container logs
	docker compose logs -f

docker-shell-dev: ## Open shell in development container
	docker compose exec app-penilaian-mahasiswa-dev sh

docker-shell-prod: ## Open shell in production container
	docker compose exec app-penilaian-mahasiswa-prod sh
