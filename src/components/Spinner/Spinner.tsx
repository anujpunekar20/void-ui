import * as stylex from '@stylexjs/stylex';
import { tokens } from '../../styles/tokens.stylex';

const spin = stylex.keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

const styles = stylex.create({
  root: {
    display: 'inline-block',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderColor: tokens.border,
    borderTopColor: tokens.accent,
    animationName: spin,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    '@media (prefers-reduced-motion: reduce)': {
      animationDuration: '0s',
    },
  },
  sm: {
    width: '18px',
    height: '18px',
    borderWidth: '1px',
    animationDuration: '0.7s',
  },
  md: {
    width: '28px',
    height: '28px',
    borderWidth: '2px',
    animationDuration: '0.7s',
  },
  lg: {
    width: '46px',
    height: '46px',
    borderWidth: '3px',
    animationDuration: '0.7s',
  },
});

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string;
}

export function Spinner({ size = 'md', 'aria-label': ariaLabel = 'Loading' }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={ariaLabel}
      {...stylex.props(styles.root, styles[size])}
    />
  );
}
