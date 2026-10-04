import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders a <button> without href', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    render(
      <Button ref={ref} type="submit">
        Send
      </Button>
    );
    const button = screen.getByRole('button', { name: 'Send' });
    expect(button.tagName).toBe('BUTTON');
    expect(ref.current).toBe(button);
  });

  it('renders an <a> with href, not a button nested in a link', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    render(
      <Button ref={ref} href="mailto:hi@example.com" variant="outline">
        Email
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Email' });
    expect(link.getAttribute('href')).toBe('mailto:hi@example.com');
    expect(link.querySelector('button')).toBeNull();
    expect(ref.current).toBe(link);
  });

  it('rejects mixing anchor and button props at compile time', () => {
    // @ts-expect-error: an <a> has no disabled state
    void (<Button href="/x" disabled />);
    // @ts-expect-error: target is anchor-only, so it needs href
    void (<Button target="_blank" />);
  });
});
