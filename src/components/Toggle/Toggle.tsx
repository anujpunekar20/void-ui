import * as stylex from '@stylexjs/stylex';
import { tokens } from '../../styles/tokens.stylex';
import { useId, useState } from 'react';
import type { InputHTMLAttributes } from 'react';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

const TRACK_WIDTH = 40;
const TRACK_HEIGHT = 20;
const THUMB_SIZE = 16;
const THUMB_INSET = 2;
const THUMB_TRAVEL = TRACK_WIDTH - THUMB_SIZE - THUMB_INSET * 2;

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
  track: {
    appearance: 'none',
    position: 'relative',
    margin: 0,
    width: `${TRACK_WIDTH}px`,
    height: `${TRACK_HEIGHT}px`,
    flexShrink: 0,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.border,
    borderRadius: tokens.radius,
    backgroundColor: tokens.bgElevated,
    cursor: 'pointer',
    transition: `border-color ${tokens.durationBase} ${tokens.easeOut}, background-color ${tokens.durationBase} ${tokens.easeOut}, box-shadow ${tokens.durationBase} ${tokens.easeOut}`,
    ':hover': {
      borderColor: tokens.accent,
    },
    ':checked': {
      backgroundColor: tokens.accent,
      borderColor: tokens.accent,
    },
    ':focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 3px ${tokens.accentGlow}`,
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.4,
    },
    '::after': {
      content: '""',
      position: 'absolute',
      top: `${THUMB_INSET}px`,
      left: `${THUMB_INSET}px`,
      width: `${THUMB_SIZE}px`,
      height: `${THUMB_SIZE}px`,
      backgroundColor: tokens.textPrimary,
      transform: 'translateX(0)',
      transition: `transform ${tokens.durationBase} ${tokens.easeOut}`,
    },
  },
  trackError: {
    borderColor: tokens.destructive,
    ':focus-visible': {
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.2)',
    },
  },
  trackChecked: {
    '::after': {
      transform: `translateX(${THUMB_TRAVEL}px)`,
      backgroundColor: tokens.bgBase,
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

export function Toggle({ label, error, id, checked, defaultChecked, onChange, ...props }: ToggleProps) {
  const generatedId = useId();
  const toggleId = id ?? generatedId;

  const isControlled = checked !== undefined;
  const [checkedState, setCheckedState] = useState(defaultChecked ?? false);
  const isChecked = isControlled ? !!checked : checkedState;

  return (
    <div {...stylex.props(styles.root)}>
      <label htmlFor={toggleId} {...stylex.props(styles.wrapper)}>
        <input
          type="checkbox"
          role="switch"
          id={toggleId}
          checked={isControlled ? checked : undefined}
          defaultChecked={isControlled ? undefined : defaultChecked}
          aria-checked={isChecked}
          onChange={(e) => {
            onChange?.(e);
            if (!isControlled) setCheckedState(e.target.checked);
          }}
          {...props}
          {...stylex.props(styles.track, isChecked && styles.trackChecked, !!error && styles.trackError)}
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
