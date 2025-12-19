import { render, screen } from '@testing-library/react';

import { EmptyState } from '@/components/empty-state';

describe('EmptyState', () => {
  it('renders with default icon and description', () => {
    render(<EmptyState title="No data" description="Nothing to show" />);

    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'No data. Nothing to show');
    expect(document.querySelector('[data-icon="Inbox"]')).toBeInTheDocument();
    expect(screen.getByText('Nothing to show')).toBeInTheDocument();
  });

  it('renders custom icon and action when provided', () => {
    render(
      <EmptyState
        title="Custom empty"
        description="Custom description"
        icon={<div data-testid="custom-icon" />}
        action={<button>Retry</button>}
      />,
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'Custom empty. Custom description',
    );
  });

  it('omits description from aria-label when not provided', () => {
    render(<EmptyState title="Only title" />);

    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Only title');
    expect(screen.queryByText('Only title')).toBeInTheDocument();
    expect(screen.queryByText('Nothing to show')).not.toBeInTheDocument();
  });
});
