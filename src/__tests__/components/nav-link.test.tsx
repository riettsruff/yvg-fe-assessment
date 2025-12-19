import { render, screen } from '@testing-library/react';
import React from 'react';

import { NavLink } from '@/components/nav-link';

jest.mock('react-router-dom', () => {
  type MockNavLinkProps = Omit<React.ComponentProps<'a'>, 'className'> & {
    className?: string | ((state: { isActive: boolean; isPending: boolean }) => string);
    to: string;
  };

  const MockNavLink = React.forwardRef<HTMLAnchorElement, MockNavLinkProps>(
    ({ className, to, ...props }, ref) => {
      const resolvedClassName =
        typeof className === 'function'
          ? className({ isActive: true, isPending: true })
          : className;

      return (
        <a ref={ref} data-to={to} data-testid="nav-link" className={resolvedClassName} {...props} />
      );
    },
  );

  return {
    NavLink: MockNavLink,
  };
});

describe('NavLink', () => {
  it('applies base, active, and pending classes', () => {
    render(
      <NavLink to="/dashboard" className="base" activeClassName="active" pendingClassName="pending">
        Dashboard
      </NavLink>,
    );

    const link = screen.getByTestId('nav-link');
    expect(link).toHaveAttribute('data-to', '/dashboard');
    expect(link.className).toContain('base');
    expect(link.className).toContain('active');
    expect(link.className).toContain('pending');
    expect(link).toHaveTextContent('Dashboard');
  });

  it('forwards refs to the underlying anchor', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <NavLink to="/profile" ref={ref} className="ref-class">
        Profile
      </NavLink>,
    );

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    expect(ref.current?.className).toContain('ref-class');
  });
});
