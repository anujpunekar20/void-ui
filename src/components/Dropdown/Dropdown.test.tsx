import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Dropdown } from './Dropdown';
import { Button } from '../Button';

const ITEMS = [
  { value: 'edit', label: 'Edit' },
  { value: 'archive', label: 'Archive', disabled: true },
  { value: 'delete', label: 'Delete', destructive: true },
];

describe('Dropdown', () => {
  it('is closed by default and opens the menu on trigger click', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<button>Actions</button>} items={ITEMS} />);

    expect(screen.queryByRole('menu')).toBeNull();

    await user.click(screen.getByRole('button', { name: 'Actions' }));

    expect(screen.queryByRole('menu')).not.toBeNull();
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeTruthy();
  });

  it('calls onSelect and closes the menu when an item is clicked', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <Dropdown
        trigger={<button>Actions</button>}
        items={[{ value: 'edit', label: 'Edit', onSelect }]}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));

    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<button>Actions</button>} items={ITEMS} />);

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.queryByRole('menu')).not.toBeNull();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('accepts a custom placement without breaking open/close behavior', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<button>Actions</button>} items={ITEMS} placement="top-end" />);

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.queryByRole('menu')).not.toBeNull();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('works with the library Button component as trigger (forwardRef wiring)', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<Button variant="outline">Actions</Button>} items={ITEMS} />);

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.queryByRole('menu')).not.toBeNull();
  });

  it('works with an arbitrary custom trigger element, not just <button>', async () => {
    const user = userEvent.setup();
    render(
      <Dropdown
        trigger={
          <span tabIndex={0} role="button">
            ⋮
          </span>
        }
        items={ITEMS}
      />
    );

    await user.click(screen.getByRole('button'));
    expect(screen.queryByRole('menu')).not.toBeNull();
  });

  it("leaves a ref already attached to the trigger untouched (position is measured off a separate anchor)", async () => {
    const user = userEvent.setup();
    const triggerRef = createRef<HTMLButtonElement>();
    render(<Dropdown trigger={<button ref={triggerRef}>Actions</button>} items={ITEMS} />);

    expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.queryByRole('menu')).not.toBeNull();
  });

  it('does not call onSelect for a disabled item', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <Dropdown
        trigger={<button>Actions</button>}
        items={[{ value: 'archive', label: 'Archive', disabled: true, onSelect }]}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(screen.getByRole('menuitem', { name: 'Archive' }));

    expect(onSelect).not.toHaveBeenCalled();
  });
});
