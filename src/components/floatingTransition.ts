import { useTransitionStyles } from '@floating-ui/react';
import type { FloatingContext } from '@floating-ui/react';

// Numeric mirrors of --void-duration-*: useTransitionStyles times the
// unmount in JS, so it can't read a CSS custom property. tokens.css zeroes
// those vars under reduced motion; the matchMedia check below does the same
// for this JS-side timer.
const OPEN_MS = 150;
const CLOSE_MS = 100;
const SLIDE_PX = 4;

/**
 * Enter/exit motion for floating surfaces (Dropdown menu, Select listbox,
 * Tooltip). Returns `isMounted` (render while true, so the close can finish)
 * and `styles` to spread onto the floating element. That element must not
 * use a transform for positioning — pass `transform: false` to useFloating.
 */
export function useFloatingTransition(context: FloatingContext) {
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  return useTransitionStyles(context, {
    duration: reduceMotion ? 0 : { open: OPEN_MS, close: CLOSE_MS },
    // Start nudged back toward the trigger, so the surface slides out of it.
    initial: ({ side }) => ({
      opacity: 0,
      transform: {
        top: `translateY(${SLIDE_PX}px)`,
        bottom: `translateY(-${SLIDE_PX}px)`,
        left: `translateX(${SLIDE_PX}px)`,
        right: `translateX(-${SLIDE_PX}px)`,
      }[side],
    }),
  });
}
