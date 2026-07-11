import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('toggles on click', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept" />);

    const box = screen.getByRole('checkbox') as HTMLInputElement;
    expect(box.checked).toBe(false);

    await user.click(box);
    expect(box.checked).toBe(true);
  });

  it('toggles via keyboard (Space) when focused', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept" />);

    const box = screen.getByRole('checkbox') as HTMLInputElement;
    box.focus();
    await user.keyboard(' ');

    expect(box.checked).toBe(true);
  });

  it('renders the label and associates it via htmlFor/id', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInstanceOf(HTMLInputElement);
  });
});
