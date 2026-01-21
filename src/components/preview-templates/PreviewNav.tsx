/**
 * Preview Nav Component
 * Navigation/header component for template previews
 */

import React from 'react';
import styles from './nav.module.css';

export interface PreviewNavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface PreviewNavProps
  extends React.HTMLAttributes<HTMLElement> {
  items?: PreviewNavItem[];
  logo?: React.ReactNode;
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}

export const PreviewNav = React.forwardRef<
  HTMLElement,
  PreviewNavProps
>(
  (
    {
      items = [],
      logo,
      activeItem,
      onItemClick,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        className={[styles.nav, className].filter(Boolean).join(' ')}
        {...props}
      >
        <div className={styles.container}>
          {logo && <div className={styles.logo}>{logo}</div>}

          {items.length > 0 && (
            <ul className={styles.items}>
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    className={[
                      styles.item,
                      activeItem === item.id && styles.active,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => onItemClick?.(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    );
  }
);

PreviewNav.displayName = 'PreviewNav';
