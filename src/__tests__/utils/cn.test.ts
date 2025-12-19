import { cn } from '@/utils/cn';

describe('cn', () => {
  it('merges class names and resolves Tailwind conflicts by keeping the latest value', () => {
    const result = cn('px-2', 'rounded', 'px-4');

    expect(result).toContain('rounded');
    expect(result).toContain('px-4');
    expect(result).not.toContain('px-2');
  });

  it('ignores falsy values and returns a trimmed string', () => {
    const result = cn('button', null, undefined, false, '');

    expect(result).toBe('button');
  });
});
