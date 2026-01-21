import React from "react";
import { Menu } from "lucide-react";
import styles from "./navigation.module.css";

export interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
  ariaLabel?: string;
}

/**
 * Mobile Navigation Toggle Button
 * Renders hamburger menu icon on mobile devices (≤767px)
 * Triggers drawer menu opening
 */
export const MobileNav = React.forwardRef<HTMLButtonElement, MobileNavProps>(
  ({ isOpen, onToggle, ariaLabel = "Toggle navigation menu" }, ref) => {
    return (
      <button
        ref={ref}
        className={styles.mobileToggle}
        onClick={onToggle}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-controls="drawer-menu"
        type="button"
      >
        <Menu className={styles.icon} />
      </button>
    );
  }
);

MobileNav.displayName = "MobileNav";
