import React, { HTMLAttributes } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./navigation.module.css";

export interface DesktopNavProps {
  navLinks: Array<{
    href: string;
    label: string;
  }>;
}

/**
 * Desktop Navigation Component
 * Displays horizontal navigation menu on desktop (900px+)
 * Shows active page indicator with underline
 */
export const DesktopNav = React.forwardRef<
  HTMLDivElement,
  DesktopNavProps & HTMLAttributes<HTMLDivElement>
>(
  ({ navLinks }, ref) => {
    const location = useLocation();

    return (
      <nav ref={ref} className={styles.desktopNav}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`text-sm font-medium transition-colors ${
              location.pathname === link.href
                ? "text-primary hover:text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    );
  }
);

DesktopNav.displayName = "DesktopNav";
