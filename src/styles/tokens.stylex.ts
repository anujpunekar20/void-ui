import * as stylex from '@stylexjs/stylex';

/**
 * Compile-time-checked accessors for the CSS custom properties defined in
 * tokens.css. defineConsts inlines these values as-is at compile time, so
 * the generated CSS is identical to writing 'var(--void-*)' directly —
 * tokens.css remains the single source of truth for actual values and the
 * public theming contract (consumers overriding --void-* stays unaffected).
 * This only buys typo-safety in component code.
 */
export const tokens = stylex.defineConsts({
  bgBase: 'var(--void-bg-base)',
  bgElevated: 'var(--void-bg-elevated)',
  bgOverlay: 'var(--void-bg-overlay)',

  border: 'var(--void-border)',
  borderStrong: 'var(--void-border-strong)',

  textPrimary: 'var(--void-text-primary)',
  textMuted: 'var(--void-text-muted)',

  accent: 'var(--void-accent)',
  accentHover: 'var(--void-accent-hover)',
  accentGlow: 'var(--void-accent-glow)',

  destructive: 'var(--void-destructive)',

  shadow: 'var(--void-shadow)',

  radius: 'var(--void-radius)',

  fontMono: 'var(--void-font-mono)',

  fontSizeBody: 'var(--void-font-size-body)',
  fontSizeLabel: 'var(--void-font-size-label)',
  fontSizeLabelSm: 'var(--void-font-size-label-sm)',

  spaceXs: 'var(--void-space-xs)',
  spaceSm: 'var(--void-space-sm)',
  spaceMd: 'var(--void-space-md)',
  spaceLg: 'var(--void-space-lg)',

  durationBase: 'var(--void-duration-base)',

  easeOut: 'var(--void-ease-out)',
});
