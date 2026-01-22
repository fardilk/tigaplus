import React from "react";
import { X, ExternalLink } from "lucide-react";
import styles from "./header-minimal.module.css";

export interface PreviewHeaderMinimalProps {
  onClose: () => void;
  externalUrl?: string;
  showBadge?: boolean;
  templateName?: string;
}

/**
 * Minimal Preview Header - Marketplace Standard
 *
 * Provides a minimal, dark header for full-screen preview experience.
 * Includes close button, optional badge, and external link.
 *
 * Design inspired by:
 * - Themeforest preview experience
 * - Envato Elements approach
 * - Creative Market standards
 *
 * The goal: user feels immersed in template, not aware of marketplace platform
 */
export const PreviewHeaderMinimal = React.forwardRef<
  HTMLDivElement,
  PreviewHeaderMinimalProps
>(
  (
    {
      onClose,
      externalUrl,
      showBadge = true,
      templateName = "Template",
    },
    ref
  ) => {
    return (
      <header
        ref={ref}
        className={styles.header}
        role="banner"
        aria-label="Preview controls"
      >
        {/* Left: Close/Back Button */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close preview and return to product page"
          type="button"
          title="Close preview (ESC)"
        >
          <X width={20} height={20} />
          <span className={styles.closeBtnText}>Back</span>
        </button>

        {/* Center: Live Preview Badge */}
        {showBadge && (
          <span className={styles.badge} aria-label="Current mode">
            Live Preview
          </span>
        )}

        {/* Right: External Link */}
        {externalUrl && (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
            aria-label={`Visit ${templateName} live in new window`}
            title={`Visit ${templateName} live (opens in new window)`}
          >
            <span>Visit Live</span>
            <ExternalLink width={16} height={16} />
          </a>
        )}
      </header>
    );
  }
);

PreviewHeaderMinimal.displayName = "PreviewHeaderMinimal";
