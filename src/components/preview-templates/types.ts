/**
 * Preview Components Shared Types
 * Common type definitions for preview components
 */

import React from 'react';

/**
 * Base props for preview components
 * Provides common accessibility and styling patterns
 */
export interface PreviewComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Button component variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Form component sizes
 */
export type FormSize = 'sm' | 'md' | 'lg';

/**
 * Card styling options
 */
export interface CardOptions {
  elevated?: boolean;
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

/**
 * Modal size options
 */
export type ModalSize = 'sm' | 'md' | 'lg';

/**
 * Color palette from preview theme
 */
export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'background'
  | 'text'
  | 'textLight'
  | 'border'
  | 'success'
  | 'warning'
  | 'error';

/**
 * Spacing scale from theme
 */
export type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Border radius options
 */
export type BorderRadius = 'sm' | 'md' | 'lg' | 'full';

/**
 * Transition speed options
 */
export type TransitionSpeed = 'fast' | 'normal' | 'slow';
