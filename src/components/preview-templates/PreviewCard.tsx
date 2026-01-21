/**
 * Preview Card Component
 * Container component for content blocks in template previews
 */

import React from 'react';
import styles from './card.module.css';

export interface PreviewCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevated?: boolean;
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export const PreviewCard = React.forwardRef<
  HTMLDivElement,
  PreviewCardProps
>(
  (
    {
      children,
      elevated = false,
      hoverable = false,
      padding = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.card,
      elevated && styles.elevated,
      hoverable && styles.hoverable,
      styles[`padding-${padding}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

PreviewCard.displayName = 'PreviewCard';
