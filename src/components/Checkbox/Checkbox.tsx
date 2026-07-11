import * as stylex from '@stylexjs/stylex';
import { tokens } from '../../styles/tokens.stylex';
import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

const CHECK_ICON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3 8l3 3 7-7' stroke='white' stroke-width='2' fill='none' stroke-linecap='square'/%3E%3C/svg%3E\")";

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spaceXs,
  },
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spaceSm,
    cursor: 'pointer',
    width: 'fit-content',
  },
  wrapperDisabled: {
    cursor: 'not-allowed',
  },
  box: {
    appearance: 'none',
    margin: 0,
    width: '20px',
    height: '20px',
    flexShrink: 0,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.border,
    borderRadius: tokens.radius,
    backgroundColor: tokens.bgElevated,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    cursor: 'pointer',
    transition: `border-color ${tokens.durationBase} ${tokens.easeOut}, background-color ${tokens.durationBase} ${tokens.easeOut}, box-shadow ${tokens.durationBase} ${tokens.easeOut}`,
    ':hover': {
      borderColor: tokens.accent,
    },
    ':checked': {
      backgroundColor: tokens.accent,
      borderColor: tokens.accent,
      backgroundImage: CHECK_ICON,
    },
    ':focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 3px ${tokens.accentGlow}`,
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.4,
      // StyleX assigns :hover a higher pseudo priority than :disabled, so
      // borderColor: accent from :hover above could still win the cascade
      // when a disabled box is hovered. pointer-events: none stops the
      // browser from ever entering hover state on the element at all.
      pointerEvents: 'none',
    },
  },
  boxError: {
    borderColor: tokens.destructive,
    ':focus-visible': {
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.2)',
    },
  },
  label: {
    fontFamily: tokens.fontMono,
    fontSize: tokens.fontSizeBody,
    color: tokens.textPrimary,
  },
  errorText: {
    fontFamily: tokens.fontMono,
    fontSize: tokens.fontSizeLabelSm,
    color: tokens.destructive,
  },
});

export function Checkbox({ label, error, id, disabled, ...props }: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <div {...stylex.props(styles.root)}>
      <label htmlFor={checkboxId} {...stylex.props(styles.wrapper, disabled && styles.wrapperDisabled)}>
        <input
          type="checkbox"
          id={checkboxId}
          disabled={disabled}
          {...props}
          {...stylex.props(styles.box, !!error && styles.boxError)}
        />
        {label && <span {...stylex.props(styles.label)}>{label}</span>}
      </label>
      {error && (
        <span role="alert" {...stylex.props(styles.errorText)}>
          {error}
        </span>
      )}
    </div>
  );
}
