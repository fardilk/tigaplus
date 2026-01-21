/**
 * Preview Footer Component
 * Footer section component for template previews
 */

import React from 'react';
import styles from './footer.module.css';

export interface PreviewFooterProps
  extends React.HTMLAttributes<HTMLElement> {
  columns?: Array<{
    title: string;
    items: Array<{ label: string; href?: string }>;
  }>;
  bottomSection?: React.ReactNode;
  copyright?: string;
}

export const PreviewFooter = React.forwardRef<
  HTMLElement,
  PreviewFooterProps
>(
  (
    {
      columns = [],
      bottomSection,
      copyright,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={[styles.footer, className].filter(Boolean).join(' ')}
        {...props}
      >
        <div className={styles.container}>
          {columns.length > 0 && (
            <div className={styles.columns}>
              {columns.map((column, idx) => (
                <div key={idx} className={styles.column}>
                  <h4 className={styles.columnTitle}>{column.title}</h4>
                  <ul className={styles.columnItems}>
                    {column.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        {item.href ? (
                          <a href={item.href} className={styles.link}>
                            {item.label}
                          </a>
                        ) : (
                          <span className={styles.text}>{item.label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {bottomSection && (
            <div className={styles.bottom}>{bottomSection}</div>
          )}

          {copyright && (
            <div className={styles.copyright}>
              <p>{copyright}</p>
            </div>
          )}
        </div>
      </footer>
    );
  }
);

PreviewFooter.displayName = 'PreviewFooter';
