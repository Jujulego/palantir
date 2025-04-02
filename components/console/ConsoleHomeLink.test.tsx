import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import ConsoleHomeLink from './ConsoleHomeLink';

describe('ConsoleHomeLink', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render a link to home page', async () => {
    render(<ConsoleHomeLink />);

    const lnk = screen.getByRole('link', { name: /palantir/i }) as HTMLAnchorElement;

    expect(lnk.href).toBe('http://localhost:3000/');
  });
});
