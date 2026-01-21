/**
 * Preview Input Component
 * Form input component for template previews
 */

import React from 'react';
import styles from './input.module.css';

export interface PreviewInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PreviewInput = React.forwardRef<
  HTMLInputElement,
  PreviewInputProps
>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={styles.container}>
        {label && (
          <label className={styles.label} htmlFor={props.id}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={[
            styles.input,
            styles[`size-${size}`],
            error && styles.error,
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {error && <span className={styles.errorText}>{error}</span>}
        {helperText && !error && (
          <span className={styles.helperText}>{helperText}</span>
        )}
      </div>
    );
  }
);

PreviewInput.displayName = 'PreviewInput';
