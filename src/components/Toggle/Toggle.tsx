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
  wrapperDisabled: {
    cursor: 'not-allowed',
  },
  trackWrap: {
    position: 'relative',
    width: `${TRACK_WIDTH}px`,
    height: `${TRACK_HEIGHT}px`,
    flexShrink: 0,
  },
  trackWrapDisabled: {
    opacity: 0.4,
  },
  track: {
    appearance: 'none',
    position: 'absolute',
    inset: 0,
    margin: 0,
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
      // StyleX assigns :hover a higher pseudo priority than :disabled, so
      // borderColor: accent from :hover above could still win the cascade
      // when a disabled track is hovered. pointer-events: none stops the
      // browser from ever entering hover state on the element at all.
      pointerEvents: 'none',
    },
  },
  trackError: {
    borderColor: tokens.destructive,
    ':focus-visible': {
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.2)',
    },
  },
  // The thumb is a sibling span rather than the input's ::after: <input> is
  // a replaced element, and browsers don't render generated content on
  // replaced elements, so a pseudo-element thumb never paints.
  thumb: {
    position: 'absolute',
    top: `${THUMB_INSET}px`,
    left: `${THUMB_INSET}px`,
    width: `${THUMB_SIZE}px`,
    height: `${THUMB_SIZE}px`,
    backgroundColor: tokens.textPrimary,
    transform: 'translateX(0)',
    transition: `transform ${tokens.durationBase} ${tokens.easeOut}, background-color ${tokens.durationBase} ${tokens.easeOut}`,
    pointerEvents: 'none',
  },
  thumbChecked: {
    transform: `translateX(${THUMB_TRAVEL}px)`,
    backgroundColor: tokens.bgBase,
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

export function Toggle({ label, error, id, checked, defaultChecked, disabled, onChange, ...props }: ToggleProps) {
  const generatedId = useId();
  const toggleId = id ?? generatedId;

  const isControlled = checked !== undefined;
  const [checkedState, setCheckedState] = useState(defaultChecked ?? false);
  const isChecked = isControlled ? !!checked : checkedState;

  return (
    <div {...stylex.props(styles.root)}>
      <label htmlFor={toggleId} {...stylex.props(styles.wrapper, disabled && styles.wrapperDisabled)}>
        <span {...stylex.props(styles.trackWrap, disabled && styles.trackWrapDisabled)}>
          <input
            type="checkbox"
            role="switch"
            id={toggleId}
            checked={isControlled ? checked : undefined}
            defaultChecked={isControlled ? undefined : defaultChecked}
            aria-checked={isChecked}
            disabled={disabled}
            onChange={(e) => {
              onChange?.(e);
              if (!isControlled) setCheckedState(e.target.checked);
            }}
            {...props}
            {...stylex.props(styles.track, !!error && styles.trackError)}
          />
          <span aria-hidden {...stylex.props(styles.thumb, isChecked && styles.thumbChecked)} />
        </span>
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
