## void-ui: dark-first, brutalist component library

void-ui ships no ThemeProvider or root wrapper component — every component reads CSS custom properties directly from `:root`, so there is nothing to import-and-wrap in JS. But the design values those properties hold are dark: `--void-text-primary` is near-white (`#f0f0f0`), and variants like Button's `ghost` and Badge's `outline` use transparent backgrounds with light borders/text. **Always place void-ui components on a dark canvas** — set the app root's background to `var(--void-bg-base)` (`#0a0a0a`) or `var(--void-bg-elevated)` (`#111111`). On a light background, ghost/outline variants and any plain text styled with `--void-text-primary` or `--void-text-muted` will render at very low contrast — this is not a bug, it is the intended dark-first design.

```css
.app-root { background: var(--void-bg-base); color: var(--void-text-primary); }
```

### Styling idiom: CSS custom properties only, no utility classes

There is no class vocabulary (no Tailwind-style utilities, no BEM). Every component is styled internally with StyleX reading `var(--void-*)` tokens; consumers only ever touch the CSS variables, never component internals. The real token names (see `styles.css` → `_ds_bundle.css` for the full compiled list):

| Concern | Tokens |
|---|---|
| Backgrounds | `--void-bg-base` (#0a0a0a), `--void-bg-elevated` (#111111), `--void-bg-overlay` (#1a1a1a) |
| Borders | `--void-border` (#2a2a2a), `--void-border-strong` (#3a3a3a) |
| Text | `--void-text-primary` (#f0f0f0), `--void-text-muted` (#888888), `--void-text-disabled` (#444444) |
| Accent (violet) | `--void-accent` (#c160ef), `--void-accent-hover`, `--void-accent-glow` |
| Destructive | `--void-destructive` (#ef4444) |
| Shadow / shape | `--void-shadow` (hard-edged offset, no blur), `--void-radius` (0px — brutalist, always sharp corners) |
| Type | `--void-font-mono` ('Kode Mono', monospace) — the only typeface; every component uses it |
| Spacing (4px base) | `--void-space-xs/sm/md/lg/xl` (4/8/16/24/48px) |

Layout glue the design agent builds itself (containers, grids, page chrome) should use these same tokens for background/border/spacing/text rather than inventing new colors — the brutalist look depends on `--void-radius: 0` (no rounded corners anywhere) and `--void-shadow` as a solid offset block, never a blurred box-shadow.

### Where the truth lives

Read `_ds_bundle.css` (via this project's `styles.css` import) for the full compiled token list and component styles, and each component's own `.prompt.md` for usage examples pulled from its real stories.

### One idiomatic build snippet

```jsx
<div style={{ background: 'var(--void-bg-base)', minHeight: '100vh', padding: 'var(--void-space-lg)' }}>
  <Card>
    <h2 style={{ color: 'var(--void-text-primary)', fontFamily: 'var(--void-font-mono)' }}>System Status</h2>
    <Button variant="solid">Refresh</Button>
  </Card>
</div>
```
