/**
 * Preview Theme System
 * Independent design system for template previews
 * Reference: /research/isolated-preview-architecture/findings.md#finding-4
 */

export interface PreviewTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textLight: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  typography: {
    headingFamily: string;
    bodyFamily: string;
    headingWeight: number;
    bodyWeight: number;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
}

/**
 * Default Preview Theme
 * Used for all template previews unless overridden
 * Colors: Warm coral + teal accent (distinct from TigaPlus primary blue)
 */
export const defaultPreviewTheme: PreviewTheme = {
  colors: {
    primary: '#FF6B6B',      // Warm coral
    secondary: '#F7F7F7',    // Light warm gray
    accent: '#0A7377',       // Deep teal
    background: '#FFFFFF',   // White
    text: '#1F2937',         // Dark gray
    textLight: '#6B7280',    // Light gray
    border: '#E5E7EB',       // Border gray
    success: '#10B981',      // Green
    warning: '#F59E0B',      // Amber
    error: '#EF4444',        // Red
  },
  typography: {
    headingFamily: "'Poppins', sans-serif",
    bodyFamily: "'Inter', sans-serif",
    headingWeight: 700,
    bodyWeight: 400,
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  },
};

/**
 * Get theme for a specific template
 * Allows template-specific theme overrides
 * @param templateId - Template ID to get theme for
 * @returns PreviewTheme - Theme object for the template
 */
export function getPreviewTheme(templateId?: string): PreviewTheme {
  // For now, all templates use default theme
  // Future: Can add template-specific theme overrides here

  // Example for future template-specific themes:
  // if (templateId === 'business-01') {
  //   return { ...defaultPreviewTheme, colors: { ...defaultPreviewTheme.colors, primary: '#6B4CE5' } }
  // }

  return defaultPreviewTheme;
}

/**
 * CSS variables generator for theme
 * Convert theme object to CSS custom properties
 * @param theme - PreviewTheme object
 * @returns Object with CSS variable names as keys
 */
export function generateCSSVariables(theme: PreviewTheme) {
  return {
    // Colors
    '--preview-primary': theme.colors.primary,
    '--preview-secondary': theme.colors.secondary,
    '--preview-accent': theme.colors.accent,
    '--preview-background': theme.colors.background,
    '--preview-text': theme.colors.text,
    '--preview-text-light': theme.colors.textLight,
    '--preview-border': theme.colors.border,
    '--preview-success': theme.colors.success,
    '--preview-warning': theme.colors.warning,
    '--preview-error': theme.colors.error,

    // Typography
    '--preview-heading-family': theme.typography.headingFamily,
    '--preview-body-family': theme.typography.bodyFamily,

    // Spacing
    '--preview-spacing-xs': theme.spacing.xs,
    '--preview-spacing-sm': theme.spacing.sm,
    '--preview-spacing-md': theme.spacing.md,
    '--preview-spacing-lg': theme.spacing.lg,
    '--preview-spacing-xl': theme.spacing.xl,
    '--preview-spacing-xxl': theme.spacing.xxl,

    // Shadows
    '--preview-shadow-sm': theme.shadows.sm,
    '--preview-shadow-md': theme.shadows.md,
    '--preview-shadow-lg': theme.shadows.lg,
    '--preview-shadow-xl': theme.shadows.xl,

    // Radius
    '--preview-radius-sm': theme.radius.sm,
    '--preview-radius-md': theme.radius.md,
    '--preview-radius-lg': theme.radius.lg,
    '--preview-radius-full': theme.radius.full,

    // Transitions
    '--preview-transition-fast': theme.transitions.fast,
    '--preview-transition-normal': theme.transitions.normal,
    '--preview-transition-slow': theme.transitions.slow,
  };
}
