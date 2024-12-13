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
    const setMode = vi.fn();
    vi.mocked(useColorScheme).mockReturnValue({
      mode: 'dark',
      systemMode: 'light',
      setMode: setMode as unknown,
    } as ColorSchemeContextValue<SupportedColorScheme>);

    // Render
    render(<ColorModeToggle />);

    const btn = screen.getByLabelText('Switch theme');

    expect(btn).toHaveRole('button');
    expect(queryByTestId(btn, 'Brightness7Icon')).toBeDefined();

    // Act
    await userEvent.click(btn);

    expect(setMode).toHaveBeenCalledWith('light');
  });

  it('should render with dark icon and switch to dark', async () => {
    const setMode = vi.fn();
    vi.mocked(useColorScheme).mockReturnValue({
      mode: 'light',
      systemMode: 'dark',
      setMode: setMode as unknown,
    } as ColorSchemeContextValue<SupportedColorScheme>);

    // Render
    render(<ColorModeToggle />);

    const btn = screen.getByLabelText('Switch theme');

    expect(btn).toHaveRole('button');
    expect(queryByTestId(btn, 'Brightness4Icon')).toBeDefined();

    // Act
    await userEvent.click(btn);

    expect(setMode).toHaveBeenCalledWith('dark');
  });

  it('should render with light icon and switch to light (system based)', async () => {
    const setMode = vi.fn();
    vi.mocked(useColorScheme).mockReturnValue({
      mode: 'system',
      systemMode: 'dark',
      setMode: setMode as unknown,
    } as ColorSchemeContextValue<SupportedColorScheme>);

    // Render
    render(<ColorModeToggle />);

    const btn = screen.getByLabelText('Switch theme');

    expect(btn).toHaveRole('button');
    expect(queryByTestId(btn, 'Brightness7Icon')).toBeDefined();

    // Act
    await userEvent.click(btn);

    expect(setMode).toHaveBeenCalledWith('light');
  });
});