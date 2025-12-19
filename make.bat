@echo off
setlocal EnableDelayedExpansion
REM Windows batch alternative to Makefile
REM Usage: make.bat <command>

if "%1"=="" goto help
if "%1"=="help" goto help
if "%1"=="install" goto install
if "%1"=="update" goto update
if "%1"=="deps-check" goto deps-check
if "%1"=="dev" goto dev
if "%1"=="build" goto build
if "%1"=="build-dev" goto build-dev
if "%1"=="preview" goto preview
if "%1"=="lint" goto lint
if "%1"=="lint-fix" goto lint-fix
if "%1"=="typecheck" goto typecheck
if "%1"=="format" goto format
if "%1"=="format-write" goto format-write
if "%1"=="test" goto test
if "%1"=="test-watch" goto test-watch
if "%1"=="test-coverage" goto test-coverage
if "%1"=="clean" goto clean
if "%1"=="dist-clean" goto dist-clean
if "%1"=="setup" goto setup
if "%1"=="check" goto check
if "%1"=="ci" goto ci
if "%1"=="info" goto info
if "%1"=="docker-build" goto docker-build
if "%1"=="docker-build-dev" goto docker-build-dev
if "%1"=="docker-dev" goto docker-dev
if "%1"=="docker-prod" goto docker-prod
if "%1"=="docker-serve" goto docker-serve
if "%1"=="docker-stop" goto docker-stop
if "%1"=="docker-clean" goto docker-clean
if "%1"=="docker-logs" goto docker-logs
if "%1"=="docker-shell-dev" goto docker-shell-dev
if "%1"=="docker-shell-prod" goto docker-shell-prod
echo Unknown command: %1
goto help

:help
echo Usage: make.bat ^<command^>
echo.
echo Available commands:
echo   help              Show this help message
echo   install           Install dependencies
echo   update            Update dependencies
echo   deps-check        Check for outdated dependencies
echo   dev               Start development server
echo   build             Build the project for production
echo   build-dev         Build the project for development mode
echo   preview           Preview production build locally
echo   lint              Run ESLint
echo   lint-fix          Run ESLint with auto-fix
echo   typecheck         Run TypeScript type checking
echo   format            Check formatting with Prettier
echo   format-write      Format code with Prettier (write changes)
echo   test              Run test suite
echo   test-watch        Run tests in watch mode
echo   test-coverage     Run tests with coverage
echo   clean             Remove build and cache artifacts
echo   dist-clean        Remove build artifacts and dependencies
echo   setup             Initial project setup
echo   check             Run linting, type checks, and tests
echo   ci                Run CI pipeline locally
echo   info              Show project information
echo   docker-build      Build Docker image for production
echo   docker-build-dev  Build Docker image for development
echo   docker-dev        Run development server in Docker
echo   docker-prod       Run production server in Docker
echo   docker-serve      Build and serve with nginx
echo   docker-stop       Stop all Docker containers
echo   docker-clean      Remove Docker containers and images
echo   docker-logs       View Docker container logs
echo   docker-shell-dev  Open shell in development container
echo   docker-shell-prod Open shell in production container
goto end

:install
pnpm install
goto end

:update
pnpm update
goto end

:deps-check
pnpm outdated
goto end

:dev
pnpm run dev
goto end

:build
pnpm run build
goto end

:build-dev
pnpm run build:dev
goto end

:preview
pnpm run preview
goto end

:lint
pnpm run lint
goto end

:lint-fix
pnpm run lint:fix
goto end

:typecheck
pnpm run typecheck
goto end

:format
pnpm run format
goto end

:format-write
pnpm run format:write
goto end

:test
pnpm run test
goto end

:test-watch
pnpm run test:watch
goto end

:test-coverage
pnpm run test:coverage
goto end

:clean
if exist dist rmdir /s /q dist
if exist .vite rmdir /s /q .vite
if exist coverage rmdir /s /q coverage
echo Clean complete.
goto end

:dist-clean
call :clean
if exist node_modules rmdir /s /q node_modules
echo Deep clean complete.
goto end

:setup
call :install
echo Project setup complete!
goto end

:check
call :lint
call :typecheck
call :test
goto end

:ci
call :install
call :check
call :build
goto end

:info
echo Project: app-penilaian-mahasiswa
set "NODE_VER="
for /f "delims=" %%v in ('node --version 2^>nul') do set "NODE_VER=%%v"
if defined NODE_VER (echo Node version: !NODE_VER!) else echo Node not found
set "PNPM_VER="
for /f "delims=" %%v in ('pnpm --version 2^>nul') do set "PNPM_VER=%%v"
if defined PNPM_VER (echo PNPM version: !PNPM_VER!) else echo PNPM not found
goto end

:docker-build
docker compose build app-penilaian-mahasiswa-prod
goto end

:docker-build-dev
docker compose build app-penilaian-mahasiswa-dev
goto end

:docker-dev
docker compose --profile dev up --build
goto end

:docker-prod
docker compose --profile prod up --build
goto end

:docker-serve
docker compose --profile serve up --build
goto end

:docker-stop
docker compose down
goto end

:docker-clean
docker compose down --rmi all --volumes --remove-orphans
goto end

:docker-logs
docker compose logs -f
goto end

:docker-shell-dev
docker compose exec app-penilaian-mahasiswa-dev sh
goto end

:docker-shell-prod
docker compose exec app-penilaian-mahasiswa-prod sh
goto end

:end
