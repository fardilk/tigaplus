/**
 * Preview Modal Component
 * Dialog/modal component for template previews
 * Provides accessible modal dialog with overlay
 */

import React, { useEffect } from 'react';
import styles from './modal.module.css';

export interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  closeButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PreviewModal = React.forwardRef<
  HTMLDivElement,
  PreviewModalProps
>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      closeButton = true,
      size = 'md',
      className,
    },
    ref
  ) => {
    // Handle escape key to close modal
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = '';
        };
      }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div
        className={[styles.backdrop, className].filter(Boolean).join(' ')}
        onClick={onClose}
      >
        <div
          ref={ref}
          className={[styles.modal, styles[`size-${size}`]]
            .filter(Boolean)
            .join(' ')}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className={styles.header}>
            {title && (
              <h2 id="modal-title" className={styles.title}>
                {title}
              </h2>
            )}
            {closeButton && (
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close modal"
              >
                <span>✕</span>
              </button>
            )}
          </div>

          <div className={styles.content}>{children}</div>
        </div>
      </div>
    );
  }
);

PreviewModal.displayName = 'PreviewModal';
