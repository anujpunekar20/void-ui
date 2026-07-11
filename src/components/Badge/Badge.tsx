import * as stylex from '@stylexjs/stylex';
import { tokens } from '../../styles/tokens.stylex';
import type { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'outline' | 'destructive';
}

const styles = stylex.create({
  base: {
    fontFamily: tokens.fontMono,
    fontSize: tokens.fontSizeLabelSm,
    fontWeight: 500,
    letterSpacing: '0.05em',
    display: 'inline-flex',
    alignItems: 'center',
    paddingTop: tokens.spaceXs,
    paddingBottom: tokens.spaceXs,
    paddingLeft: tokens.spaceSm,
    paddingRight: tokens.spaceSm,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: tokens.radius,
    whiteSpace: 'nowrap',
    lineHeight: 1,
  },
  default: {
    backgroundColor: tokens.bgOverlay,
    color: tokens.textPrimary,
    borderColor: tokens.border,
  },
  accent: {
    backgroundColor: tokens.bgOverlay,
    color: tokens.accent,
    borderColor: tokens.accentGlow,
  },
  outline: {
    backgroundColor: 'transparent',
    color: tokens.textPrimary,
    borderColor: tokens.borderStrong,
  },
  destructive: {
    backgroundColor: tokens.bgOverlay,
    color: tokens.destructive,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
});

export function Badge({ variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span {...props} {...stylex.props(styles.base, styles[variant])}>
      {children}
    </span>
  );
}
