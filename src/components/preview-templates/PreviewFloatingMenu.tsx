/**
 * Preview Floating CTA Menu Component
 * Fixed floating menu for purchase action in template previews
 * Provides persistent call-to-action while scrolling through preview
 */

import React from 'react';
import styles from './floating-menu.module.css';
import { PreviewButton } from './PreviewButton';

export interface PreviewFloatingMenuProps
  extends React.HTMLAttributes<HTMLDivElement> {
  previewLabel?: string;
  ctaLabel?: string;
  onCtaClick: () => void;
  variant?: 'default' | 'minimal';
  ariaLabel?: string;
  isOpen?: boolean;
}

export const PreviewFloatingMenu = React.forwardRef<
  HTMLDivElement,
  PreviewFloatingMenuProps
>(
  (
    {
      previewLabel = 'Preview Mode',
      ctaLabel = 'Miliki Website Ini',
      onCtaClick,
      variant = 'default',
      className,
      ariaLabel = 'Preview mode controls',
      isOpen = true,
      ...props
    },
    ref
  ) => {
    // Hide menu when order modal is open
    if (!isOpen) {
      return null;
    }

    const classNames = [styles.floatingMenu, styles[`variant-${variant}`], className]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        role="banner"
        aria-label={ariaLabel}
        {...props}
      >
        <div className={styles.container}>
          {/* Preview Badge */}
          <div className={styles.badge} aria-label="Current mode">
            <span className={styles.badgeIcon}>👁</span>
            <span className={styles.badgeText}>{previewLabel}</span>
          </div>

          {/* CTA Button */}
          <PreviewButton
            variant="accent"
            size="md"
            onClick={onCtaClick}
            aria-label="Purchase this website template"
          >
            {ctaLabel}
          </PreviewButton>
        </div>
      </div>
    );
  }
);

PreviewFloatingMenu.displayName = 'PreviewFloatingMenu';
