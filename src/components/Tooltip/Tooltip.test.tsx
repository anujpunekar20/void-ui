import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('is hidden by default and appears on hover', async () => {
    const user = userEvent.setup();
    render(<Tooltip trigger={<button>Info</button>} label="A helpful hint" />);

    expect(screen.queryByRole('tooltip')).toBeNull();

    await user.hover(screen.getByRole('button', { name: 'Info' }));

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeNull();
    });
    expect(screen.getByRole('tooltip').textContent).toContain('A helpful hint');
  });

  it('disappears on unhover', async () => {
    const user = userEvent.setup();
    render(<Tooltip trigger={<button>Info</button>} label="A helpful hint" />);

    const trigger = screen.getByRole('button', { name: 'Info' });
    await user.hover(trigger);
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeNull();
    });

    await user.unhover(trigger);
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).toBeNull();
    });
  });

  // Real browsers open the tooltip on keyboard (:focus-visible) focus via
  // floating-ui's useFocus({ visibleOnly: true }) — the correct behavior, so
  // click-to-focus doesn't also trigger it. happy-dom doesn't implement
  // :focus-visible matching (always reports false), so this environment
  // can't exercise that specific open path; this only verifies the focus
  // itself lands on the trigger.
  it('moves focus to the trigger via Tab', async () => {
    const user = userEvent.setup();
    render(<Tooltip trigger={<button>Info</button>} label="A helpful hint" />);

    await user.tab();

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Info' }));
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    render(<Tooltip trigger={<button>Info</button>} label="A helpful hint" />);

    await user.hover(screen.getByRole('button', { name: 'Info' }));
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeNull();
    });

    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).toBeNull();
    });
  });

  it('works with an arbitrary custom trigger element, not just <button>', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip
        trigger={
          <span tabIndex={0} role="button">
            ⓘ
          </span>
        }
        label="A helpful hint"
      />
    );

    await user.hover(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeNull();
    });
  });
});
