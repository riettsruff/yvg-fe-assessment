import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

import { TodoForm } from '@/modules/todo/components/todo-form';

describe('TodoForm', () => {
  it('handles input changes, trims on submit, and disables when empty', () => {
    const onSubmit = jest.fn();

    const Wrapper = () => {
      const [value, setValue] = useState('  write tests  ');
      return (
        <TodoForm
          value={value}
          placeholder="Add task"
          buttonLabel="Add Task"
          hint="Add todo hint"
          onChange={setValue}
          onSubmit={onSubmit}
        />
      );
    };

    render(<Wrapper />);

    const input = screen.getByPlaceholderText('Add task');
    fireEvent.change(input, { target: { value: ' new task ' } });
    expect(input).toHaveValue(' new task ');

    fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));
    expect(onSubmit).toHaveBeenCalledWith('new task');

    onSubmit.mockClear();
    fireEvent.change(input, { target: { value: '   ' } });
    expect(screen.getByRole('button', { name: 'Add Task' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Add todo hint')).toBeInTheDocument();
  });
});
