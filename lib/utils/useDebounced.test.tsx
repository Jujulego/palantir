import { useDebounced } from '@/lib/utils/useDebounced';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('useDebounced', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('should print value update with a delay', async () => {
    const { rerender } = render(<Debounced value={1} />);

    // Appearance is immediate
    expect(screen.queryByText(1)).not.toBeNull();

    // Update is delayed
    rerender(<Debounced value={2} />);

    expect(screen.queryByText(2)).toBeNull();
    expect(screen.queryByText(1)).not.toBeNull();

    await vi.advanceTimersByTimeAsync(1000);

    await vi.waitFor(() => expect(screen.queryByText(1)).toBeNull());
    expect(screen.queryByText(2)).not.toBeNull();
  });
});

function Debounced({ value }: { value: number }) {
  const debounced = useDebounced(value, 1000);

  return <span>{ debounced }</span>;
}