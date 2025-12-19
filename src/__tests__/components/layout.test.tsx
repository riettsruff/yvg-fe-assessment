import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Layout, getInitialHeaderHeight, resolveWindow } from '@/components/layout';

jest.mock('@/components/language-toggle', () => ({
  LanguageToggle: () => <div data-testid="language-toggle" />,
}));

jest.mock('@/components/theme-toggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle" />,
}));

const translations: Record<string, string> = {
  'common.skipToMain': 'Skip to content',
  'common.brand': 'Brand',
  'common.brandSubtitle': 'Subtitle',
  'common.openMenu': 'Open menu',
  'common.closeMenu': 'Close menu',
  'common.footer': 'Footer {year}',
  'nav.todos.label': 'Todos',
  'nav.todos.description': 'Manage tasks',
  'nav.posts.label': 'Posts',
  'nav.posts.description': 'Browse posts',
};

const mockUseI18n = jest.fn();

jest.mock('@/contexts/locale-context', () => ({
  useI18n: () => mockUseI18n(),
}));

const routerFutureConfig = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
} as const;

describe('Layout', () => {
  beforeEach(() => {
    mockUseI18n.mockReturnValue({
      t: (key: string, params?: Record<string, string | number>) =>
        translations[key]?.replace('{year}', String(params?.year ?? '')) ?? key,
    });
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      width: 0,
      height: 120,
      top: 0,
      left: 0,
      right: 0,
      bottom: 120,
      toJSON: () => ({}),
    } as DOMRect);
  });

  afterEach(() => {
    (HTMLElement.prototype.getBoundingClientRect as jest.Mock).mockRestore();
  });

  const renderLayout = (path = '/') =>
    render(
      <MemoryRouter initialEntries={[path]} future={routerFutureConfig}>
        <Layout>
          <div data-testid="layout-children">Child</div>
        </Layout>
      </MemoryRouter>,
    );

  it('renders navigation, skip link, footer, and active desktop nav', () => {
    renderLayout('/posts');

    expect(screen.getByText('Skip to content')).toHaveAttribute('href', '#main-content');
    expect(screen.getByLabelText('Brand')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
    expect(screen.getByText('Todos')).toBeInTheDocument();

    const activeLink = screen.getByRole('link', { name: /Posts - Browse posts/ });
    expect(activeLink).toHaveAttribute('aria-current', 'page');

    const root = screen.getByRole('banner').parentElement;
    expect(root).toHaveStyle('--app-header-height: 120px');
    expect(screen.getByText(/Footer 202/)).toBeInTheDocument();
    expect(screen.getByTestId('layout-children')).toHaveTextContent('Child');
  });

  it('toggles mobile navigation via menu button', () => {
    renderLayout('/');

    const menuButton = screen.getByRole('button', { name: /Open menu/i });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByLabelText('Mobile navigation')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Todos - Manage tasks/ }).length).toBeGreaterThan(0);

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('uses mobile header height and skips ResizeObserver when unsupported', () => {
    const originalResizeObserver = (global as any).ResizeObserver;
    const originalInnerWidth = window.innerWidth;

    (global as any).ResizeObserver = undefined;
    Object.defineProperty(window, 'innerWidth', { value: 500, configurable: true });

    renderLayout('/');

    const root = screen.getByRole('banner').parentElement;
    expect(root).toHaveStyle('--app-header-height: 64px');

    (global as any).ResizeObserver = originalResizeObserver;
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, configurable: true });
  });

  it('calculates header height for SSR and mobile viewports', () => {
    expect(getInitialHeaderHeight(undefined)).toBe(80);
    expect(getInitialHeaderHeight({ innerWidth: 500 } as any)).toBe(64);

    const windowSpy = jest.spyOn(global as any, 'window', 'get').mockReturnValue(undefined as any);
    expect(resolveWindow()).toBeUndefined();
    windowSpy.mockRestore();
  });

  it('closes the mobile menu when a navigation item is selected', () => {
    renderLayout('/');

    const menuButton = screen.getByRole('button', { name: /Open menu/i });
    fireEvent.click(menuButton);
    expect(screen.getByLabelText('Mobile navigation')).toBeInTheDocument();

    const mobileNav = screen.getByLabelText('Mobile navigation');
    const todosLink = within(mobileNav).getByRole('link', { name: /Todos - Manage tasks/ });
    fireEvent.click(todosLink);

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByLabelText('Mobile navigation')).not.toBeInTheDocument();
  });
});
