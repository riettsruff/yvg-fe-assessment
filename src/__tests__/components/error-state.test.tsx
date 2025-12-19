import { fireEvent, render, screen } from '@testing-library/react';

import { ErrorState } from '@/components/error-state';

const mockUseI18n = jest.fn();

jest.mock('@/contexts/locale-context', () => ({
  useI18n: () => mockUseI18n(),
}));

describe('ErrorState', () => {
  beforeEach(() => {
    mockUseI18n.mockReturnValue({
      t: (key: string) => key,
    });
  });

  it('renders title, message, and retry action when provided', () => {
    const onRetry = jest.fn();
    render(<ErrorState message="Something failed" onRetry={onRetry} />);

    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
    expect(screen.getByText('errorState.title')).toBeInTheDocument();
    expect(screen.getByText('Something failed')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'errorState.retryAria' });
    fireEvent.click(button);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('renders without retry button when onRetry is undefined', () => {
    render(<ErrorState message="No retry" />);

    expect(screen.queryByRole('button', { name: 'errorState.retryAria' })).not.toBeInTheDocument();
    expect(screen.getByText('No retry')).toBeInTheDocument();
  });
});
