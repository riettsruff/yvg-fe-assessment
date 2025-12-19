import { fireEvent, render, screen } from '@testing-library/react';

import { LanguageToggle } from '@/components/language-toggle';

const mockUseI18n = jest.fn();

jest.mock('@/contexts/locale-context', () => ({
  useI18n: () => mockUseI18n(),
}));

describe('LanguageToggle', () => {
  beforeEach(() => {
    mockUseI18n.mockReset();
  });

  const buildTranslations = (locale: 'en' | 'id') => {
    const t = jest.fn((key: string, params?: Record<string, string>) => {
      if (key === 'common.language.toggle') return `toggle-${params?.language}`;
      if (key === 'common.language.current') return `current-${params?.language}`;
      if (key === 'common.language.en') return 'English';
      if (key === 'common.language.id') return 'Bahasa Indonesia';
      return key;
    });

    mockUseI18n.mockReturnValue({
      locale,
      toggleLocale: jest.fn(),
      t,
    });
  };

  it('renders current locale and accessible labels for switching language', () => {
    buildTranslations('en');
    render(<LanguageToggle />);

    const button = screen.getByRole('button', { name: /toggle-Bahasa Indonesia/i });
    expect(button).toHaveTextContent('EN');
    expect(button).toHaveAttribute('title', 'current-English');
  });

  it('renders Indonesian state and toggles on click', () => {
    buildTranslations('id');
    render(<LanguageToggle />);

    const button = screen.getByRole('button', { name: /toggle-English/i });
    expect(button).toHaveTextContent('ID');
    expect(button).toHaveAttribute('title', 'current-Bahasa Indonesia');

    const { toggleLocale } = mockUseI18n.mock.results[0].value;
    fireEvent.click(button);
    expect(toggleLocale).toHaveBeenCalledTimes(1);
  });
});
