import * as stylex from '@stylexjs/stylex';
import { tokens } from '../../styles/tokens.stylex';
import { Children, isValidElement, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { InputHTMLAttributes, KeyboardEvent, ReactElement, ReactNode } from 'react';
import { optionStyles } from '../Option/Option';
import type { OptionProps } from '../Option/Option';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children'> {
  label?: string;
  error?: string;
  /** Simple data-driven suggestions. Ignored if `children` is provided. */
  options?: SelectOption[];
  /** `<Option>` elements — takes precedence over `options` when non-empty. */
  children?: ReactNode;
}

interface Item {
  value: string;
  label: string;
  disabled?: boolean;
  node: ReactNode;
}

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spaceXs,
    width: '100%',
  },
  label: {
    fontFamily: tokens.fontMono,
    fontSize: tokens.fontSizeLabelSm,
    fontWeight: 500,
    letterSpacing: '0.05em',
    color: tokens.textMuted,
  },
  wrapper: {
    position: 'relative',
    width: '100%',
  },
  input: {
    fontFamily: tokens.fontMono,
    fontSize: tokens.fontSizeBody,
    color: tokens.textPrimary,
    backgroundColor: tokens.bgElevated,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.border,
    borderRadius: tokens.radius,
    paddingTop: tokens.spaceSm,
    paddingBottom: tokens.spaceSm,
    paddingLeft: tokens.spaceMd,
    paddingRight: tokens.spaceMd,
    outline: 'none',
    width: '100%',
    transition: `border-color ${tokens.durationBase} ${tokens.easeOut}, box-shadow ${tokens.durationBase} ${tokens.easeOut}`,
    ':focus': {
      borderColor: tokens.accent,
      boxShadow: `0 0 0 3px ${tokens.accentGlow}`,
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.4,
    },
  },
  inputError: {
    borderColor: tokens.destructive,
    ':focus': {
      borderColor: tokens.destructive,
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.2)',
    },
  },
  listbox: {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    right: 0,
    backgroundColor: tokens.bgOverlay,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.border,
    borderRadius: tokens.radius,
    maxHeight: '240px',
    overflowY: 'auto',
    zIndex: 10,
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  errorText: {
    fontFamily: tokens.fontMono,
    fontSize: tokens.fontSizeLabelSm,
    color: tokens.destructive,
  },
});

export function Select({
  label,
  error,
  id,
  options,
  children,
  defaultValue,
  value,
  onChange,
  onFocus,
  onKeyDown,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listboxId = `${inputId}-listbox`;

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [query, setQuery] = useState(String(defaultValue ?? value ?? ''));
  // Only narrow the list while the user is actively typing to search —
  // reopening via focus (without typing) should show every option again,
  // not just the one matching the previously selected label.
  const [isFiltering, setIsFiltering] = useState(false);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value as string) : query;

  const items: Item[] = useMemo(() => {
    const kids = Children.toArray(children).filter(isValidElement) as ReactElement<OptionProps>[];
    if (kids.length > 0) {
      return kids.map((el) => ({
        value: el.props.value,
        label: el.props.label ?? (typeof el.props.children === 'string' ? el.props.children : el.props.value),
        disabled: el.props.disabled,
        node: el.props.children,
      }));
    }
    return (options ?? []).map((o) => ({ value: o.value, label: o.label, node: o.label }));
  }, [children, options]);

  const filtered = useMemo(
    () =>
      isFiltering
        ? items.filter((item) => item.label.toLowerCase().includes(currentValue.toLowerCase()))
        : items,
    [items, currentValue, isFiltering]
  );

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, []);

  function selectItem(item: Item) {
    if (item.disabled) return;
    if (!isControlled) setQuery(item.label);
    setOpen(false);
    setActiveIndex(-1);
    setIsFiltering(false);
    // Blur so a subsequent click re-fires focus and reopens the dropdown
    // (an already-focused input otherwise wouldn't fire onFocus again).
    inputRef.current?.blur();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (open && activeIndex >= 0 && filtered[activeIndex]) {
        e.preventDefault();
        selectItem(filtered[activeIndex]);
      } else {
        setOpen(false);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div ref={rootRef} {...stylex.props(styles.root)}>
      {label && (
        <label htmlFor={inputId} {...stylex.props(styles.label)}>
          {label}
        </label>
      )}
      <div {...stylex.props(styles.wrapper)}>
        <input
          {...props}
          ref={inputRef}
          id={inputId}
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `${listboxId}-opt-${activeIndex}` : undefined}
          autoComplete="off"
          value={currentValue}
          onChange={(e) => {
            onChange?.(e);
            if (!isControlled) setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
            setIsFiltering(true);
          }}
          onFocus={(e) => {
            onFocus?.(e);
            setOpen(true);
            setIsFiltering(false);
          }}
          onKeyDown={handleKeyDown}
          {...stylex.props(styles.input, !!error && styles.inputError)}
        />
        {open && filtered.length > 0 && (
          <ul role="listbox" id={listboxId} {...stylex.props(styles.listbox)}>
            {filtered.map((item, i) => (
              <li
                key={item.value}
                id={`${listboxId}-opt-${i}`}
                role="option"
                aria-selected={i === activeIndex}
                aria-disabled={item.disabled}
                onPointerDown={(e) => {
                  e.preventDefault();
                  selectItem(item);
                }}
                onPointerLeave={() => setActiveIndex(-1)}
                onPointerEnter={() => setActiveIndex(i)}
                {...stylex.props(
                  optionStyles.option,
                  i === activeIndex && optionStyles.optionActive,
                  item.disabled && optionStyles.optionDisabled
                )}
              >
                {item.node}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <span role="alert" {...stylex.props(styles.errorText)}>
          {error}
        </span>
      )}
    </div>
  );
}
