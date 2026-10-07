// The theming panel's single source of truth: what a visitor picks, and the
// --void-* overrides that choice writes onto :root. Only tokens that exist in
// src/styles/tokens.css belong here; shadow offsets and radius are not themable.

export const ACCENTS = [
  { name: 'Violet', value: '#c160ef' },
  { name: 'Signal', value: '#ff6a2b' },
  { name: 'Acid', value: '#c4f135' },
  { name: 'Cyan', value: '#3dd6f5' },
  { name: 'Rose', value: '#ff4f8b' },
] as const;

export const SHADOWS = ['gray', 'accent', 'bone'] as const;
export type ShadowChoice = (typeof SHADOWS)[number];

export interface ThemeChoice {
  accent: string; // any CSS color, from a swatch or the color input
  shadow: ShadowChoice;
}

export const DEFAULT_THEME: ThemeChoice = { accent: ACCENTS[0].value, shadow: 'gray' };

// Map a choice to the custom properties it overrides. Return only what differs
// from tokens.css, so the code block shows a minimal, copy-pasteable override.
export function themeVars(choice: ThemeChoice): Record<string, string> {
  const vars: Record<string, string> = {};
  if (choice.accent.toLowerCase() !== DEFAULT_THEME.accent) {
    vars['--void-accent'] = choice.accent;
    vars['--void-accent-hover'] = `color-mix(in srgb, ${choice.accent}, white 15%)`;
    vars['--void-accent-glow'] = `color-mix(in srgb, ${choice.accent} 20%, transparent)`;
  }
  if (choice.shadow === 'accent') vars['--void-shadow'] = 'var(--void-accent)';
  if (choice.shadow === 'bone') vars['--void-shadow'] = 'var(--void-text-primary)';
  return vars;
}
