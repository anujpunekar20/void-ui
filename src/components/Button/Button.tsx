import * as stylex from '@stylexjs/stylex';
import { tokens } from '../../styles/tokens.stylex';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

const styles = stylex.create({
  base: {
    fontFamily: tokens.fontMono,
    fontWeight: 500,
    letterSpacing: '0.05em',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: tokens.radius,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    transition: `all ${tokens.durationBase} ${tokens.easeOut}`,
    ':focus-visible': {
      outline: `2px solid ${tokens.accent}`,
      outlineOffset: '2px',
      boxShadow: `0 0 0 4px ${tokens.accentGlow}`,
    },
    ':active': {
      transform: 'scale(0.97)',
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.4,
    },
  },
  sm: {
    paddingTop: tokens.spaceXs,
    paddingBottom: tokens.spaceXs,
    paddingLeft: tokens.spaceSm,
    paddingRight: tokens.spaceSm,
    fontSize: tokens.fontSizeLabelSm,
    lineHeight: 1,
  },
  md: {
    paddingTop: tokens.spaceSm,
    paddingBottom: tokens.spaceSm,
    paddingLeft: tokens.spaceMd,
    paddingRight: tokens.spaceMd,
    fontSize: tokens.fontSizeLabel,
    lineHeight: 1,
  },
  lg: {
    paddingTop: tokens.spaceSm,
    paddingBottom: tokens.spaceSm,
    paddingLeft: tokens.spaceLg,
    paddingRight: tokens.spaceLg,
    fontSize: tokens.fontSizeBody,
    lineHeight: 1,
  },
  solid: {
    backgroundColor: tokens.accent,
    color: tokens.bgBase,
    borderColor: tokens.accent,
    ':hover': {
      backgroundColor: tokens.accentHover,
      borderColor: tokens.accentHover,
    },
  },
  outline: {
    backgroundColor: 'transparent',
    color: tokens.accent,
    borderColor: tokens.accent,
    ':hover': {
      backgroundColor: tokens.accentGlow,
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: tokens.textPrimary,
    borderColor: 'transparent',
    ':hover': {
      backgroundColor: tokens.bgOverlay,
    },
  },
  destructive: {
    backgroundColor: tokens.destructive,
    color: '#ffffff',
    borderColor: tokens.destructive,
    ':hover': {
      filter: 'brightness(1.1)',
    },
  },
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'solid', size = 'md', children, ...props },
  ref
) {
  return (
    <button ref={ref} {...props} {...stylex.props(styles.base, styles[size], styles[variant])}>
      {children}
    </button>
  );
});
