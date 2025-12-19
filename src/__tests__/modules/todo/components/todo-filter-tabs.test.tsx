import { fireEvent, render, screen } from '@testing-library/react';

import { TodoFilterTabs } from '@/modules/todo/components/todo-filter-tabs';

describe('TodoFilterTabs', () => {
  it('renders filter options with counts and handles change', () => {
    const onChange = jest.fn();
    const options = [
      { value: 'all', label: 'All' },
      { value: 'pending', label: 'Pending' },
      { value: 'completed', label: 'Completed' },
    ] as const;

    render(
      <TodoFilterTabs
        active="pending"
        options={options as any}
        counts={{ total: 5, completed: 2, pending: 3 }}
        label="Filters"
        onChange={onChange}
      />,
    );

    const pendingTab = screen.getByRole('tab', { name: /Pending/ });
    expect(pendingTab).toHaveAttribute('aria-selected', 'true');
    expect(pendingTab).toHaveTextContent('3');

    fireEvent.click(screen.getByRole('tab', { name: /Completed/ }));
    expect(onChange).toHaveBeenCalledWith('completed');
  });
});
