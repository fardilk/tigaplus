import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import styles from "./drawer.module.css";

export interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{
    href: string;
    label: string;
  }>;
  ctaLabel?: string;
  onCtaClick?: () => void;
  ariaLabel?: string;
}

/**
 * Drawer Menu Component
 * Slides in from right side, supports:
 * - Right-to-left swipe gesture to close (optional)
 * - Keyboard (ESC key)
 * - Click outside (overlay click)
 * - Close button
 * - Menu item click
 * - Active page indicator
 * - Safe area handling for iOS notch/Android system UI
 * - Dynamic viewport height (100dvh)
 */
export const DrawerMenu = React.forwardRef<HTMLDivElement, DrawerMenuProps>(
  (
    {
      isOpen,
      onClose,
      navLinks,
      ctaLabel = "Order",
      onCtaClick,
      ariaLabel = "Navigation menu",
    },
    ref
  ) => {
    const location = useLocation();
    const drawerRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef<number>(0);
    const [isDragging, setIsDragging] = useState(false);

    /**
     * Handle swipe gesture
     * Detects right-to-left swipe (finger moving from right to left)
     * Thresholds:
     * - 30px: minimum to detect swipe has started
     * - 50px: minimum to complete and close drawer
     */
    const handleTouchStart = (e: React.TouchEvent) => {
      if (!isOpen) return;
      touchStartX.current = e.touches[0].clientX;
      setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!isDragging || !isOpen) return;

      const currentX = e.touches[0].clientX;
      const diff = touchStartX.current - currentX; // Positive = left movement (right-to-left swipe)

      // Only process swipe if it moves left more than 30px (detection threshold)
      if (diff > 30) {
        // Calculate progress from 0 to 1
        const progress = Math.min(diff / 100, 1);

        // Optional: Animate drawer following finger during swipe
        if (drawerRef.current) {
          drawerRef.current.style.transform = `translateX(${progress * 100}%)`;
        }
      }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      if (!isDragging || !isOpen) return;

      const currentX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - currentX;

      // Close if swipe distance exceeds 50px threshold
      if (diff > 50) {
        onClose();
      } else {
        // Snap back to open position if swipe insufficient
        if (drawerRef.current) {
          drawerRef.current.style.transform = "translateX(0)";
        }
      }

      setIsDragging(false);
    };

    /**
     * Handle keyboard navigation
     * ESC key closes drawer
     */
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    /**
     * Handle click outside to close
     * Clicking overlay closes drawer
     */
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        // Check if click is on overlay (not on drawer content)
        if (target.className.includes(styles.overlay)) {
          onClose();
        }
      };

      window.addEventListener("click", handleClickOutside);
      return () => window.removeEventListener("click", handleClickOutside);
    }, [isOpen, onClose, styles.overlay]);

    /**
     * Close drawer when route changes (page navigation)
     */
    useEffect(() => {
      onClose();
    }, [location.pathname, onClose]);

    return (
      <>
        {/* Overlay - Semi-transparent backdrop */}
        <div
          className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
          role="presentation"
          aria-hidden={!isOpen}
        />

        {/* Drawer */}
        <div
          ref={ref || drawerRef}
          id="drawer-menu"
          className={`${styles.drawer} ${isOpen ? styles.open : ""} ${
            isDragging ? styles.dragging : ""
          }`}
          role="navigation"
          aria-label={ariaLabel}
          aria-hidden={!isOpen}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>Menu</h2>
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close menu"
              type="button"
            >
              <X width={24} height={24} />
            </button>
          </div>

          {/* Content - Navigation Links */}
          <nav className={styles.content}>
            <div className={styles.nav}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`${styles.navLink} ${
                    location.pathname === link.href ? styles.active : ""
                  }`}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer - CTA Button */}
          <div className={styles.footer}>
            <button
              className={styles.ctaButton}
              onClick={() => {
                onCtaClick?.();
                onClose();
              }}
              type="button"
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      </>
    );
  }
);

DrawerMenu.displayName = "DrawerMenu";
