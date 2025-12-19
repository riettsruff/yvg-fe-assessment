import { render, screen } from '@testing-library/react';

import { LoadingState } from '@/components/loading-state';

const mockUseI18n = jest.fn();

jest.mock('@/contexts/locale-context', () => ({
  useI18n: () => mockUseI18n(),
}));

describe('LoadingState', () => {
  beforeEach(() => {
    mockUseI18n.mockReturnValue({
      t: (key: string) => (key === 'common.loadingAlt' ? 'Alt loading' : 'Default loading'),
    });
  });

  it('uses default translation when message is not provided', () => {
    render(<LoadingState />);

    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-busy', 'true');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByText('Default loading')).toBeInTheDocument();
    expect(screen.getByText('Alt loading')).toBeInTheDocument();
  });

  it('renders custom loading message', () => {
    render(<LoadingState message="Loading data" />);

    expect(screen.getByText('Loading data')).toBeInTheDocument();
    expect(screen.getByText('Alt loading')).toBeInTheDocument();
  });
});
