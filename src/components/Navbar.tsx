/**
 * Navbar Component - Responsive Navigation
 * Now using improved mobile-friendly navigation with:
 * - Desktop horizontal nav (900px+)
 * - Mobile hamburger + drawer (≤899px)
 * - Device-specific drawer widths (85vw, 75vw, 70vw, 65vw)
 * - Swipe gesture support (right-to-left to close)
 * - Keyboard navigation (ESC to close)
 * - Safe area handling for iOS notch/Android system UI
 * - Dynamic viewport height (100dvh)
 *
 * See `/web/src/components/navigation/` for implementation details
 */

export { Navigation as Navbar } from "@/components/navigation";
