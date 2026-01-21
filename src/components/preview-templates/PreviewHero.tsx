/**
 * Preview Hero Component
 * Large banner/hero section component for template previews
 */

import React from 'react';
import styles from './hero.module.css';

export interface PreviewHeroProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export const PreviewHero = React.forwardRef<
  HTMLDivElement,
  PreviewHeroProps
>(
  (
    {
      title,
      subtitle,
      backgroundImage,
      backgroundColor,
      children,
      actions,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const heroStyle: React.CSSProperties = {
      ...style,
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      backgroundColor: backgroundColor,
    };

    return (
      <div
        ref={ref}
        className={[styles.hero, className].filter(Boolean).join(' ')}
        style={heroStyle}
        {...props}
      >
        <div className={styles.overlay} />
        <div className={styles.content}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {children}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      </div>
    );
  }
);

PreviewHero.displayName = 'PreviewHero';
