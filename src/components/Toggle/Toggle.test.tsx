import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useState } from 'react';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('toggles on click when uncontrolled', async () => {
    const user = userEvent.setup();
    render(<Toggle label="Notifications" />);

    const switchEl = screen.getByRole('switch') as HTMLInputElement;
    expect(switchEl.checked).toBe(false);

    await user.click(switchEl);
    expect(switchEl.checked).toBe(true);
  });

  it('respects a controlled checked prop', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [on, setOn] = useState(false);
      return <Toggle label="Notifications" checked={on} onChange={(e) => setOn(e.target.checked)} />;
    }
    render(<Controlled />);

    const switchEl = screen.getByRole('switch') as HTMLInputElement;
    await user.click(switchEl);

    expect(switchEl.checked).toBe(true);
  });

  it('reflects checked state via aria-checked for the switch role', async () => {
    const user = userEvent.setup();
    render(<Toggle label="Notifications" />);

    const switchEl = screen.getByRole('switch');
    expect(switchEl.getAttribute('aria-checked')).toBe('false');

    await user.click(switchEl);
    expect(switchEl.getAttribute('aria-checked')).toBe('true');
  });
});
