import * as stylex from '@stylexjs/stylex';
import { tokens } from '../../styles/tokens.stylex';
import { cloneElement, useId, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';

// Matches --void-space-sm — floating-ui's offset() needs a raw pixel number,
// it can't resolve a CSS custom property.
const TOOLTIP_GAP = 8;

export interface TooltipProps {
  /** The element the tooltip describes — cloned with hover/focus/aria props attached. */
  trigger: ReactElement;
  /** Short text content. Tooltips must stay non-interactive, so this is text-only, not arbitrary children. */
  label: string;
  /** Preferred side/alignment relative to the trigger. Falls back to the opposite side if there's no room. @default 'top' */
  placement?: Placement;
}

const styles = stylex.create({
  anchor: {
    display: 'inline-block',
  },
  bubble: {
    fontFamily: tokens.fontMono,
    fontSize: tokens.fontSizeLabelSm,
    color: tokens.textPrimary,
    backgroundColor: tokens.bgOverlay,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.border,
    borderRadius: tokens.radius,
    boxShadow: `3px 3px 0 0 ${tokens.shadow}`,
    paddingTop: tokens.spaceXs,
    paddingBottom: tokens.spaceXs,
    paddingLeft: tokens.spaceSm,
    paddingRight: tokens.spaceSm,
    maxWidth: '240px',
    pointerEvents: 'none',
  },
});

export function Tooltip({ trigger, label, placement = 'top' }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef<SVGSVGElement>(null);
  const tooltipId = useId();

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(TOOLTIP_GAP), flip(), shift({ padding: 8 }), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { delay: { open: 200, close: 0 } });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  return (
    <>
      {/*
        Position is measured off this wrapper, not the trigger itself, so a
        press effect on the trigger (e.g. Button's :active scale) can't shift
        getBoundingClientRect() and make the tooltip jump. Interaction/ARIA
        props still go on the real trigger element for correct semantics —
        this span exists purely as a stable measurement anchor.
      */}
      <span ref={refs.setReference} {...stylex.props(styles.anchor)}>
        {cloneElement(
          trigger,
          getReferenceProps({
            'aria-describedby': open ? tooltipId : undefined,
            ...trigger.props,
          })
        )}
      </span>
      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            id={tooltipId}
            style={floatingStyles}
            {...getFloatingProps()}
            {...stylex.props(styles.bubble)}
          >
            {label}
            <FloatingArrow
              ref={arrowRef}
              context={context}
              fill={tokens.bgOverlay}
              stroke={tokens.border}
              strokeWidth={1}
            />
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
