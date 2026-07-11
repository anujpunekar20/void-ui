import * as stylex from '@stylexjs/stylex';
import { tokens } from '../../styles/tokens.stylex';
import { cloneElement, useId, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import { optionStyles } from '../Option/Option';

// floating-ui's offset() needs a raw pixel number, it can't resolve a CSS
// custom property.
const MENU_GAP = 6;

export interface DropdownItem {
  value: string;
  label: string;
  disabled?: boolean;
  destructive?: boolean;
  onSelect?: () => void;
}

export interface DropdownProps {
  /** The element that opens the menu — cloned with aria/click props attached. */
  trigger: ReactElement;
  items: DropdownItem[];
  /** Preferred side/alignment relative to the trigger. Falls back to the opposite side if there's no room. @default 'bottom-start' */
  placement?: Placement;
}

const styles = stylex.create({
  anchor: {
    display: 'inline-block',
  },
  menu: {
    backgroundColor: tokens.bgOverlay,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.border,
    borderRadius: tokens.radius,
    boxShadow: `3px 3px 0 0 ${tokens.shadow}`,
    minWidth: '160px',
    maxHeight: '320px',
    overflowY: 'auto',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    outline: 'none',
  },
  itemDestructive: {
    color: tokens.destructive,
  },
});

export function Dropdown({ trigger, items, placement = 'bottom-start' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const menuId = useId();

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(MENU_GAP), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'menu' });
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNavigation,
  ]);

  function selectItem(item: DropdownItem) {
    if (item.disabled) return;
    item.onSelect?.();
    setOpen(false);
    setActiveIndex(null);
  }

  return (
    <>
      {/*
        Position is measured off this wrapper, not the trigger itself, so a
        press effect on the trigger (e.g. Button's :active scale) can't shift
        getBoundingClientRect() and make the menu jump. Interaction/ARIA
        props still go on the real trigger element for correct semantics —
        this span exists purely as a stable measurement anchor.
      */}
      <span ref={refs.setReference} {...stylex.props(styles.anchor)}>
        {cloneElement(
          trigger,
          getReferenceProps({
            'aria-haspopup': 'menu' as const,
            'aria-expanded': open,
            ...trigger.props,
          })
        )}
      </span>
      {open && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <ul
              ref={refs.setFloating}
              id={menuId}
              style={floatingStyles}
              {...getFloatingProps()}
              {...stylex.props(styles.menu)}
            >
              {items.map((item, i) => (
                <li
                  key={item.value}
                  ref={(node) => {
                    listRef.current[i] = node;
                  }}
                  role="menuitem"
                  aria-disabled={item.disabled}
                  tabIndex={activeIndex === i ? 0 : -1}
                  {...getItemProps({
                    onClick: () => selectItem(item),
                  })}
                  {...stylex.props(
                    optionStyles.option,
                    item.destructive && styles.itemDestructive,
                    activeIndex === i && optionStyles.optionActive,
                    item.disabled && optionStyles.optionDisabled
                  )}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
