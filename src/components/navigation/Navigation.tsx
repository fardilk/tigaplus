import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/context/OrderContext";
import { cn } from "@/lib/utils";
import styles from "./navigation.module.css";
import { MobileNav } from "./MobileNav";
import { DrawerMenu } from "./DrawerMenu";
import { DesktopNav } from "./DesktopNav";
import { useDrawerMenu } from "./useDrawerMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/preview", label: "Preview" },
  { href: "/contact", label: "Contact" },
];

/**
 * Main Navigation Component
 * Responsive navigation with:
 * - Desktop horizontal nav (900px+)
 * - Mobile hamburger + drawer (≤899px)
 * - Device-specific drawer widths (85vw, 75vw, 70vw, 65vw)
 * - Swipe gesture support
 * - Keyboard navigation
 * - Safe area handling
 * - Scroll state tracking
 */
export const Navigation = React.forwardRef<HTMLDivElement>(
  (_, ref) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { isOpen, toggle, close } = useDrawerMenu();
    const { openOrderModal } = useOrder();

    /**
     * Track scroll position for navbar styling
     * When scrolled, add backdrop blur and shadow
     */
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleCtaClick = () => {
      openOrderModal();
    };

    return (
      <header
        ref={ref}
        className={cn(styles.header, isScrolled && styles.scrolled)}
        role="banner"
      >
        <div className={styles.container}>
          {/* Logo */}
          <Link to="/" className={styles.logo} aria-label="TigaPlus Home">
            <img
              src="https://cdn-fardil-2025.s3.us-east-2.amazonaws.com/tigaplus/main-logo.svg"
              alt="TigaPlus Logo"
              className={styles.logoImage}
            />
          </Link>

          {/* Desktop Navigation (900px+) */}
          <DesktopNav navLinks={navLinks} />

          {/* CTA Button - Desktop only */}
          <div className={styles.ctaButton}>
            <Button onClick={handleCtaClick} size="sm">
              Order
            </Button>
          </div>

          {/* Mobile Hamburger Toggle (≤899px) */}
          <MobileNav isOpen={isOpen} onToggle={toggle} />
        </div>

        {/* Drawer Menu (≤899px) */}
        <DrawerMenu
          isOpen={isOpen}
          onClose={close}
          navLinks={navLinks}
          ctaLabel="Order"
          onCtaClick={handleCtaClick}
        />
      </header>
    );
  }
);

Navigation.displayName = "Navigation";
