import { fireEvent, render, screen } from '@testing-library/react';

import { ThemeToggle } from '@/components/theme-toggle';

const mockUseTheme = jest.fn();
const mockUseI18n = jest.fn();

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => mockUseTheme(),
}));

jest.mock('@/contexts/locale-context', () => ({
  useI18n: () => mockUseI18n(),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    mockUseTheme.mockReset();
    mockUseI18n.mockReset();
  });

  const buildTranslations = () => {
    mockUseI18n.mockReturnValue({
      t: (key: string, params?: Record<string, string>) => {
        if (key === 'common.theme.toggle') return `toggle-${params?.theme}`;
        if (key === 'common.theme.current') return `current-${params?.theme}`;
        if (key === 'common.theme.light') return 'light';
        if (key === 'common.theme.dark') return 'dark';
        if (key === 'common.theme.label') return 'toggle theme';
        return key;
      },
    });
  };

  it('shows light theme state and toggles when clicked', () => {
    const toggleTheme = jest.fn();
    mockUseTheme.mockReturnValue({ theme: 'light', toggleTheme });
    buildTranslations();

    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /toggle-dark/i });
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveAttribute('title', 'current-light');
    expect(screen.getByText('toggle theme')).toBeInTheDocument();

    const sunIcon = button.querySelector('[data-icon="Sun"]') as SVGElement | null;
    const moonIcon = button.querySelector('[data-icon="Moon"]') as SVGElement | null;
    expect(sunIcon?.getAttribute('class') ?? '').toContain('opacity-100');
    expect(moonIcon?.getAttribute('class') ?? '').toContain('opacity-0');

    fireEvent.click(button);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  it('shows dark theme state with correct accessibility attributes', () => {
    mockUseTheme.mockReturnValue({ theme: 'dark', toggleTheme: jest.fn() });
    buildTranslations();

    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /toggle-light/i });
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('title', 'current-dark');

    const sunIcon = button.querySelector('[data-icon="Sun"]') as SVGElement | null;
    const moonIcon = button.querySelector('[data-icon="Moon"]') as SVGElement | null;
    expect(sunIcon?.getAttribute('class') ?? '').toContain('opacity-0');
    expect(moonIcon?.getAttribute('class') ?? '').toContain('opacity-100');
  });
});
