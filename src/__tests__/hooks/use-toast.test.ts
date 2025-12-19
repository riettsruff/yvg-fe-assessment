import { act, renderHook } from '@testing-library/react';

import { __resetToastStateForTests, reducer, toast, useToast } from '@/hooks/use-toast';

describe('useToast and reducer', () => {
  beforeEach(() => {
    __resetToastStateForTests();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
  });

  it('adds toasts and enforces the toast limit', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'First' });
    });

    expect(result.current.toasts).toHaveLength(1);
    const firstId = result.current.toasts[0].id;

    act(() => {
      toast({ title: 'Second' });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].id).not.toBe(firstId);
    expect(result.current.toasts[0].title).toBe('Second');
  });

  it('updates and dismisses toasts by id while avoiding duplicate removal timers', () => {
    const { result } = renderHook(() => useToast());
    let handle: ReturnType<typeof toast>;

    act(() => {
      handle = toast({ title: 'Hello', description: 'World' });
    });

    act(() => {
      handle.update({ title: 'Updated title', description: 'Updated desc', id: handle.id } as any);
    });

    expect(result.current.toasts[0].title).toBe('Updated title');

    act(() => {
      result.current.dismiss(handle.id);
    });

    expect(jest.getTimerCount()).toBe(1);
    expect(result.current.toasts[0].open).toBe(false);

    act(() => {
      result.current.dismiss(handle.id);
    });

    expect(jest.getTimerCount()).toBe(1);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('dismisses all toasts when no id is provided', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'A' });
    });

    act(() => {
      result.current.dismiss();
    });

    expect(result.current.toasts[0].open).toBe(false);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('reducer clears state when REMOVE_TOAST has no id', () => {
    const nextState = reducer({ toasts: [{ id: '1' } as any] }, { type: 'REMOVE_TOAST' } as any);

    expect(nextState.toasts).toHaveLength(0);
  });

  it('keeps unrelated toasts untouched when updating or dismissing specific ids', () => {
    const unrelated = { id: 'keep', open: true } as any;
    const updated = reducer(
      { toasts: [{ id: '1', open: true } as any, unrelated] },
      { type: 'UPDATE_TOAST', toast: { id: '1', title: 'Updated' } as any },
    );

    expect(updated.toasts[1]).toBe(unrelated);

    const dismissed = reducer(updated, { type: 'DISMISS_TOAST', toastId: '1' });
    expect(dismissed.toasts[1].open).toBe(true);
  });

  it('honors onOpenChange dismissal and reset clears timers/listeners', () => {
    const { result } = renderHook(() => useToast());
    let handle: ReturnType<typeof toast>;

    act(() => {
      handle = toast({ title: 'Close me' });
    });

    act(() => {
      handle.dismiss();
    });
    expect(result.current.toasts[0].open).toBe(false);

    act(() => {
      result.current.toasts[0].onOpenChange?.(false);
    });

    expect(jest.getTimerCount()).toBe(1);

    act(() => {
      __resetToastStateForTests();
    });

    expect(jest.getTimerCount()).toBe(0);
    const { result: resetResult } = renderHook(() => useToast());
    expect(resetResult.current.toasts).toHaveLength(0);
  });
});
