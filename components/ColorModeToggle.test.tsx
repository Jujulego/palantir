import ColorModeToggle from '@/components/ColorModeToggle';
import { type SupportedColorScheme, useColorScheme } from '@mui/material/styles';
import type { ColorSchemeContextValue } from '@mui/system';
import '@testing-library/jest-dom/vitest';
import { cleanup, queryByTestId, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@mui/material/styles');

describe('ColorModeToggle', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render with light icon and switch to light', async () => {
    const setColorScheme = vi.fn();
    vi.mocked(useColorScheme).mockReturnValue({
      colorScheme: 'dark',
      setColorScheme: setColorScheme as unknown,
    } as ColorSchemeContextValue<SupportedColorScheme>);

    // Render
    render(<ColorModeToggle />);

    const btn = screen.getByLabelText('Switch theme');

    expect(btn).toHaveRole('button');
    expect(queryByTestId(btn, 'Brightness7Icon')).toBeDefined();

    // Act
    await userEvent.click(btn);

    expect(setColorScheme).toHaveBeenCalledWith('light');
  });

  it('should render with dark icon and switch to dark', async () => {
    const setColorScheme = vi.fn();
    vi.mocked(useColorScheme).mockReturnValue({
      colorScheme: 'light',
      setColorScheme: setColorScheme as unknown,
    } as ColorSchemeContextValue<SupportedColorScheme>);

    // Render
    render(<ColorModeToggle />);

    const btn = screen.getByLabelText('Switch theme');

    expect(btn).toHaveRole('button');
    expect(queryByTestId(btn, 'Brightness4Icon')).toBeDefined();

    // Act
    await userEvent.click(btn);

    expect(setColorScheme).toHaveBeenCalledWith('dark');
  });
});
