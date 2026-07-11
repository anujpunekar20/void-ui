import * as stylex from '@stylexjs/stylex';
import { tokens } from '../../styles/tokens.stylex';
import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spaceXs,
    width: '100%',
  },
  label: {
    fontFamily: tokens.fontMono,
    fontSize: tokens.fontSizeLabelSm,
    fontWeight: 500,
    letterSpacing: '0.05em',
    color: tokens.textMuted,
  },
  input: {
    fontFamily: tokens.fontMono,
    fontSize: tokens.fontSizeBody,
    color: tokens.textPrimary,
    backgroundColor: tokens.bgElevated,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.border,
    borderRadius: tokens.radius,
    paddingTop: tokens.spaceSm,
    paddingBottom: tokens.spaceSm,
    paddingLeft: tokens.spaceMd,
    paddingRight: tokens.spaceMd,
    outline: 'none',
    width: '100%',
    transition: `border-color ${tokens.durationBase} ${tokens.easeOut}, box-shadow ${tokens.durationBase} ${tokens.easeOut}`,
    '::placeholder': {
      color: 'rgba(240, 240, 240, 0.4)',
    },
    ':focus': {
      borderColor: tokens.accent,
      boxShadow: `0 0 0 3px ${tokens.accentGlow}`,
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.4,
    },
  },
  inputError: {
    borderColor: tokens.destructive,
    ':focus': {
      borderColor: tokens.destructive,
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.2)',
    },
  },
  errorText: {
    fontFamily: tokens.fontMono,
    fontSize: tokens.fontSizeLabelSm,
    color: tokens.destructive,
  },
});

export function Input({ label, error, id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div {...stylex.props(styles.root)}>
      {label && (
        <label htmlFor={inputId} {...stylex.props(styles.label)}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        {...props}
        {...stylex.props(styles.input, !!error && styles.inputError)}
      />
      {error && (
        <span role="alert" {...stylex.props(styles.errorText)}>
          {error}
        </span>
      )}
    </div>
  );
}
