# void-ui Design Spec

**Date:** 2026-07-05  
**Status:** Approved

---

## Overview

`void-ui` is a dark-first, minimalist React UI component library built with TypeScript. It is designed to be lightweight, dependency-free (from the consumer's perspective), and aesthetically opinionated — deep blacks, glassy surfaces, and a violet (`#c160ef`) accent system.

Primary use cases:
- Developer portfolios and personal projects
- Any app that wants a premium dark aesthetic out of the box
- The author's own Next.js portfolio site (dogfooded from day one)

---

## Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Language | TypeScript | Type safety + autocomplete for consumers |
| Framework | React 18+ | Starting point; Vue/Svelte later |
| Styling | CSS Custom Properties + plain CSS | Zero runtime cost, SSR-safe, no Tailwind dependency |
| Bundler | tsup | Fast, ESM + CJS dual output, minimal config |
| Dev environment | Storybook | Component isolation and visual docs |
| Package registry | npm (npmjs.com) | Standard; scoped as `void-ui` or `@author/void-ui` |

---

## Color System

All colors are exposed as CSS custom properties on `:root`. Consumers can override any variable to theme the library.

```css
:root {
  --void-bg-base:        #0a0a0a;   /* page background */
  --void-bg-elevated:    #111111;   /* cards, modals */
  --void-bg-overlay:     #1a1a1a;   /* hover states */
  --void-border:         #2a2a2a;   /* subtle borders */
  --void-border-strong:  #3a3a3a;   /* focused borders */
  --void-text-primary:   #f0f0f0;
  --void-text-muted:     #888888;
  --void-text-disabled:  #444444;
  --void-accent:         #c160ef;   /* violet */
  --void-accent-hover:   #d175ff;
  --void-accent-glow:    rgba(193, 96, 239, 0.2);
  --void-destructive:    #ef4444;
  --void-radius:         6px;       /* global border radius */
}
```

The "glassy/shiny" feel is achieved via:
- `backdrop-filter: blur()` on overlays and cards
- Thin `1px` borders with low-opacity whites
- Violet glow (`box-shadow`) on focus and active states

---

## Component List

### Primitives
- `Button` — variants: `solid`, `outline`, `ghost`, `destructive`; sizes: `sm`, `md`, `lg`
- `Badge` — variants: `default`, `accent`, `outline`, `destructive`
- `Spinner` — loading indicator, size variants

### Inputs
- `Input` — text, password, search; supports label, error state, helper text
- `Textarea` — auto-resize option
- `Select` — styled native select (accessible, no JS overhead)
- `Checkbox` — custom styled, accessible
- `Toggle` — switch component

### Overlay
- `Dropdown` — menu with keyboard navigation (arrow keys, escape)
- `Popover` — positioned floating content (uses `floating-ui`)
- `Tooltip` — hover labels (lightweight, uses `floating-ui`)
- `Modal` — dialog with focus trap, backdrop blur

### Layout & Display
- `Card` — glassy surface, the signature component of the library
- `Separator` — horizontal/vertical divider
- `Avatar` — image with fallback initials

### Feedback
- `Toast` — notification system with queue management

---

## Architecture

```
void-ui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.css
│   │   │   └── index.ts
│   │   └── ... (one folder per component)
│   ├── styles/
│   │   └── tokens.css       # CSS custom properties (the design tokens)
│   └── index.ts             # main entry — re-exports everything
├── stories/                 # Storybook stories
├── docs/
├── package.json
└── tsup.config.ts
```

Each component is self-contained: its own `.tsx`, `.css`, and `index.ts`. The consumer imports only what they need — tree-shaking handles the rest.

---

## Publishing

- Package name: `void-ui` on npmjs.com
- Output: dual ESM + CJS via tsup
- Peer dependencies: `react`, `react-dom` (not bundled)
- Consumers must import the CSS once: `import 'void-ui/styles'`
- Versioning: semver starting at `0.1.0`
- CI: GitHub Actions for automated publish on tag push

---

## Animations

Animations are first-class, not an afterthought. All motion uses CSS custom properties so consumers can reduce or disable motion globally.

```css
:root {
  --void-duration-fast:   100ms;
  --void-duration-base:   200ms;
  --void-duration-slow:   350ms;
  --void-ease-out:        cubic-bezier(0.16, 1, 0.3, 1);  /* snappy exit */
  --void-ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Motion principles:**
- Entrances are fast (100–200ms), exits are faster (80–150ms)
- Overlays (Modal, Popover, Dropdown, Tooltip) use fade + subtle scale (`scale(0.97) → scale(1)`)
- Interactive elements (Button, Toggle, Checkbox) use micro-transitions on hover/active
- All animations respect `prefers-reduced-motion` — motion collapses to instant when set

**Animation targets per component:**
- `Button` — subtle scale-down on press (`scale(0.97)`)
- `Toggle` — smooth thumb slide with eased timing
- `Checkbox` — checkmark draw animation (SVG stroke-dashoffset)
- `Dropdown / Select` — fade + slide-down on open
- `Popover / Tooltip` — fade + scale from anchor point
- `Modal` — backdrop fade + content slide-up
- `Toast` — slide-in from bottom-right, slide-out on dismiss
- `Spinner` — continuous rotation with eased stroke (SVG)
- `Card` — optional hover lift (translate-y + glow intensify)

---

## Out of Scope (v1)

- Vue and Svelte wrappers (future)
- Light mode / theming system (future)
- Form validation integration
- Data table / complex data components
