# design-sync notes — void-ui

## Fixes / findings

- [GENERAL] void-ui is dark-first: several variants (Button `ghost`, likely others using `tokens.textPrimary`/light borders on transparent bg) are styled to sit on a dark canvas (storybook's default bg is `#0a0a0a`, set via the `backgrounds` addon in `.storybook/preview.ts`, not a decorator). The preview harness's product-card page background is a fixed white (`ds-bundle` emit.mjs, app-contract, never forked), so these variants render low-contrast on preview cards. This is not a preview bug — token colors are pixel-correct — it's a real usage requirement. Documented in `.design-sync/conventions.md`: the design agent must place void-ui components on a dark canvas (`--void-bg-base`/equivalent), never a light one.
- `[FONT_REMOTE]` "Kode Mono" (`--void-font-mono`) — remote font-host `@import`; assumed to serve correctly at runtime, no action needed.

- `cfg.overrides` sets `cardMode: "column"` for Card, Input, Select, Textarea — their stories render wider than a grid cell (data-dense forms/cards); column mode keeps every story at full card width instead of cropping. Presentation-only, doesn't affect grades.

## Re-sync risks

- The dark-first legibility issue (Ghost/Outline variants, plain label/body text using `--void-text-primary`/`--void-text-muted`) will keep appearing as `close` on every re-sync unless the design agent starts wrapping preview-adjacent content in a dark canvas — that's an app-level fix, not something this repo's build can change. Don't mistake it for a regression.
- No provider/ThemeProvider exists in this repo (`cfg.provider` intentionally unset) — if a future component introduces one, revisit `cfg.provider` and this file's wrapping guidance.
- No components in this DS load remote images or require MSW/data-fetching mocks — if a future component does, add it to the solo-phase diversity set and expect `[ASSETS_BLOCKED]`/`sb-error` handling per the skill.
- 12 component dirs exist under `src/components/` but only 11 are storied/exported to `window.Anuj20VoidUi` (Option is excluded — internal/non-top-level export). If Option gains its own stories later, it'll need `cfg.titleMap` or similar to include it.
