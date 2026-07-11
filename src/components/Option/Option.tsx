import * as stylex from '@stylexjs/stylex';
import { tokens } from '../../styles/tokens.stylex';
import type { ReactNode } from 'react';

export interface OptionProps {
  value: string;
  /** Used for search-matching when children isn't a plain string. */
  label?: string;
  disabled?: boolean;
  children: ReactNode;
}

export const optionStyles = stylex.create({
  option: {
    fontFamily: tokens.fontMono,
    fontSize: tokens.fontSizeBody,
    color: tokens.textPrimary,
    paddingTop: tokens.spaceSm,
    paddingBottom: tokens.spaceSm,
    paddingLeft: tokens.spaceMd,
    paddingRight: tokens.spaceMd,
    cursor: 'pointer',
    userSelect: 'none',
  },
  optionActive: {
    backgroundColor: tokens.accentGlow,
    color: tokens.accent,
  },
  optionDisabled: {
    cursor: 'not-allowed',
    opacity: 0.4,
  },
});

/**
 * Marker component describing a Select suggestion. Select reads its props
 * via Children.toArray rather than rendering it directly, so it owns the
 * actual row element (id/aria/active-state/handlers) in one place.
 */
export function Option({ children }: OptionProps) {
  return <>{children}</>;
}
