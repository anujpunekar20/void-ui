import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Select } from './Select';
import { Option } from '../Option';

const FRAMEWORKS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];

describe('Select', () => {
  it('filters suggestions by case-insensitive substring match', async () => {
    const user = userEvent.setup();
    render(<Select label="Framework" options={FRAMEWORKS} />);

    await user.type(screen.getByRole('combobox'), 'v');

    expect(screen.queryByRole('option', { name: 'Vue' })).not.toBeNull();
    expect(screen.queryByRole('option', { name: 'React' })).toBeNull();
  });

  it('selects the active suggestion with ArrowDown + Enter and closes the listbox', async () => {
    const user = userEvent.setup();
    render(<Select label="Framework" options={FRAMEWORKS} />);

    const input = screen.getByRole('combobox') as HTMLInputElement;
    await user.click(input);
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');

    expect(input.value).toBe('Vue');
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('keeps free text that does not match any option', async () => {
    const user = userEvent.setup();
    render(<Select label="Framework" options={FRAMEWORKS} />);

    const input = screen.getByRole('combobox') as HTMLInputElement;
    await user.type(input, 'Angular');

    expect(input.value).toBe('Angular');
  });

  it('shows every option again on reopen after a selection, not just the selected one', async () => {
    const user = userEvent.setup();
    render(<Select label="Framework" options={FRAMEWORKS} />);

    const input = screen.getByRole('combobox') as HTMLInputElement;
    await user.click(input);
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');
    expect(input.value).toBe('Vue');

    await user.click(input);

    expect(screen.queryByRole('option', { name: 'React' })).not.toBeNull();
    expect(screen.queryByRole('option', { name: 'Vue' })).not.toBeNull();
    expect(screen.queryByRole('option', { name: 'Svelte' })).not.toBeNull();
  });

  it('prefers children over the options prop when both are provided', async () => {
    const user = userEvent.setup();
    render(
      <Select label="Framework" options={FRAMEWORKS}>
        <Option value="only">Only Option</Option>
      </Select>
    );

    await user.click(screen.getByRole('combobox'));

    expect(screen.queryByRole('option', { name: 'Only Option' })).not.toBeNull();
    expect(screen.queryByRole('option', { name: 'React' })).toBeNull();
  });
});
