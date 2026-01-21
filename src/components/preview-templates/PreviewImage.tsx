/**
 * Preview Image Component
 * Lazy-loading image component with placeholder support
 * Optimized for template previews
 */

import React, { useState, useEffect } from 'react';
import styles from './image.module.css';

export interface PreviewImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  placeholder?: string;
  lazy?: boolean;
  aspectRatio?: 'square' | '16/9' | '4/3' | '3/2' | number;
}

export const PreviewImage = React.forwardRef<
  HTMLImageElement,
  PreviewImageProps
>(
  (
    {
      src,
      placeholder,
      lazy = true,
      aspectRatio,
      className,
      alt = 'Image',
      ...props
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    // Handle lazy loading with Intersection Observer
    useEffect(() => {
      if (!lazy || !ref) {
        setImageSrc(src);
        return;
      }

      const img = (ref as React.MutableRefObject<HTMLImageElement>)?.current;
      if (!img) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(img);
          }
        },
        {
          rootMargin: '50px',
        }
      );

      observer.observe(img);

      return () => {
        observer.disconnect();
      };
    }, [src, lazy, ref]);

    const aspectRatioValue =
      aspectRatio === 'square'
        ? 1
        : aspectRatio === '16/9'
          ? 16 / 9
          : aspectRatio === '4/3'
            ? 4 / 3
            : aspectRatio === '3/2'
              ? 3 / 2
              : aspectRatio;

    const containerStyle: React.CSSProperties =
      aspectRatioValue && typeof aspectRatioValue === 'number'
        ? { aspectRatio: `${aspectRatioValue}` }
        : undefined;

    return (
      <div
        className={[styles.imageContainer, className].filter(Boolean).join(' ')}
        style={containerStyle}
      >
        {placeholder && !isLoaded && (
          <img
            className={styles.placeholder}
            src={placeholder}
            alt={alt}
            aria-hidden="true"
          />
        )}

        {imageSrc && (
          <img
            ref={ref}
            src={imageSrc}
            alt={alt}
            className={[styles.image, isLoaded && styles.loaded]
              .filter(Boolean)
              .join(' ')}
            onLoad={() => setIsLoaded(true)}
            {...props}
          />
        )}
      </div>
    );
  }
);

PreviewImage.displayName = 'PreviewImage';
