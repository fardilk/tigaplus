/**
 * Preview Layout Component
 * Master layout wrapper for template previews
 * Orchestrates nav, hero, content, and footer sections
 */

import React from 'react';
import styles from './layout.module.css';

export interface PreviewLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  nav?: React.ReactNode;
  hero?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  fullHeight?: boolean;
}

export const PreviewLayout = React.forwardRef<
  HTMLDivElement,
  PreviewLayoutProps
>(
  (
    {
      nav,
      hero,
      children,
      footer,
      fullHeight = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={[
          styles.layout,
          fullHeight && styles.fullHeight,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {nav && <header className={styles.navSection}>{nav}</header>}
        {hero && <section className={styles.heroSection}>{hero}</section>}
        {children && (
          <main className={styles.mainSection}>{children}</main>
        )}
        {footer && <footer className={styles.footerSection}>{footer}</footer>}
      </div>
    );
  }
);

PreviewLayout.displayName = 'PreviewLayout';
