import { CheckSquare, FileText, Menu, Sparkles, X } from 'lucide-react';
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '@/components/core/button';
import { LanguageToggle } from '@/components/language-toggle';
import { ThemeToggle } from '@/components/theme-toggle';
import { useI18n } from '@/contexts/locale-context';
import { cn } from '@/utils/cn';

export interface LayoutProps {
  children: ReactNode;
}

export const getInitialHeaderHeight = (win?: typeof window) => {
  if (!win) return 80;
  return win.innerWidth >= 768 ? 80 : 64;
};

export const resolveWindow = () => (typeof window === 'undefined' ? undefined : window);

const navItems = [
  {
    path: '/',
    labelKey: 'nav.todos.label',
    descriptionKey: 'nav.todos.description',
    icon: CheckSquare,
  },
  {
    path: '/posts',
    labelKey: 'nav.posts.label',
    descriptionKey: 'nav.posts.description',
    icon: FileText,
  },
] as const;

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(() => {
    return getInitialHeaderHeight(resolveWindow());
  });
  const { t } = useI18n();

  useEffect(() => {
    const element = headerRef.current;
    if (!element || typeof ResizeObserver === 'undefined') return;

    const updateHeight = () => setHeaderHeight(element.getBoundingClientRect().height);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const layoutStyle = {
    '--app-header-height': `${headerHeight}px`,
  } as CSSProperties;

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden" style={layoutStyle}>
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        {t('common.skipToMain')}
      </a>

      {/* Header */}
      <header
        ref={headerRef}
        className="fixed top-0 inset-x-0 z-50 border-b border-border/50 glass backdrop-blur-xl"
        role="banner"
      >
        <div className="container flex h-16 md:h-20 items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label={t('common.brand')}>
            <div className="relative h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary transition-transform transform-gpu will-change-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl tracking-tight">{t('common.brand')}</span>
              <p className="text-xs text-muted-foreground">{t('common.brandSubtitle')}</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <nav
              className="hidden md:flex items-center gap-2"
              role="navigation"
              aria-label="Main navigation"
            >
              {navItems.map(({ path, labelKey, descriptionKey, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    'group relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
                    location.pathname === path
                      ? 'bg-gradient-primary text-primary-foreground shadow-glow'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
                  )}
                  aria-current={location.pathname === path ? 'page' : undefined}
                  aria-label={`${t(labelKey)} - ${t(descriptionKey)}`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{t(labelKey)}</span>
                  {location.pathname === path && (
                    <span
                      className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary-foreground/50 rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              ))}
            </nav>

            <LanguageToggle />
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                'md:hidden transition-colors',
                mobileMenuOpen
                  ? 'bg-gradient-primary text-primary-foreground shadow-glow hover:bg-gradient-primary'
                  : 'bg-secondary text-foreground hover:bg-secondary/80',
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? t('common.closeMenu') : t('common.openMenu')}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden border-t border-border/50 glass animate-slide-up"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="container py-4 space-y-2">
              {navItems.map(({ path, labelKey, descriptionKey, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                    location.pathname === path
                      ? 'bg-gradient-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
                  )}
                  aria-current={location.pathname === path ? 'page' : undefined}
                  aria-label={`${t(labelKey)} - ${t(descriptionKey)}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <div>
                    <span>{t(labelKey)}</span>
                    <p
                      className={cn(
                        'text-xs',
                        location.pathname === path
                          ? 'text-primary-foreground/70'
                          : 'text-muted-foreground',
                      )}
                    >
                      {t(descriptionKey)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main
        id="main-content"
        className="container pb-8 md:pb-12 relative z-10 pt-[calc(var(--app-header-height,4rem)+2rem)] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        role="main"
        tabIndex={-1}
      >
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 mt-auto" role="contentinfo">
        <div className="container text-center text-sm text-muted-foreground">
          <p>{t('common.footer', { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
    </div>
  );
};
