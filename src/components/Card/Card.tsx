import * as stylex from '@stylexjs/stylex';
import { tokens } from '../../styles/tokens.stylex';
import type { HTMLAttributes, ReactNode } from 'react';

const styles = stylex.create({
  root: {
    backgroundColor: tokens.bgElevated,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.border,
    borderRadius: tokens.radius,
    boxShadow: `3px 3px 0 0 ${tokens.shadow}`,
    width: '100%',
  },
  header: {
    paddingTop: tokens.spaceMd,
    paddingBottom: tokens.spaceMd,
    paddingLeft: tokens.spaceMd,
    paddingRight: tokens.spaceMd,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.border,
    fontFamily: tokens.fontMono,
    fontSize: tokens.fontSizeLabel,
    fontWeight: 500,
    letterSpacing: '0.05em',
    color: tokens.textPrimary,
  },
  body: {
    paddingTop: tokens.spaceMd,
    paddingBottom: tokens.spaceMd,
    paddingLeft: tokens.spaceMd,
    paddingRight: tokens.spaceMd,
    fontFamily: tokens.fontMono,
    fontSize: tokens.fontSizeBody,
    color: tokens.textPrimary,
  },
});

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
  children?: ReactNode;
}

export function Card({ header, children, ...props }: CardProps) {
  return (
    <div {...props} {...stylex.props(styles.root)}>
      {header && <div {...stylex.props(styles.header)}>{header}</div>}
      <div {...stylex.props(styles.body)}>{children}</div>
    </div>
  );
}
