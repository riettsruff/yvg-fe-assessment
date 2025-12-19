import { fireEvent, render, screen } from '@testing-library/react';

import { PostSearch } from '@/modules/post/components/post-search';

describe('PostSearch', () => {
  it('renders search field and triggers change, enter, and button search actions', () => {
    const onChange = jest.fn();
    const onSearch = jest.fn();

    render(
      <PostSearch
        pendingSearch="12"
        label="Search posts"
        placeholder="Search by ID"
        hint="Enter a number"
        buttonLabel="Go"
        onChange={onChange}
        onSearch={onSearch}
      />,
    );

    const input = screen.getByPlaceholderText('Search by ID') as HTMLInputElement;
    expect(screen.getByRole('search', { name: 'Search posts' })).toBeInTheDocument();
    expect(input.value).toBe('12');

    fireEvent.change(input, { target: { value: '34' } });
    expect(onChange).toHaveBeenCalledWith('34');

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSearch).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'Go' }));
    expect(onSearch).toHaveBeenCalledTimes(2);
    expect(screen.getByText('Enter a number')).toHaveAttribute('id', 'search-hint');
  });
});
