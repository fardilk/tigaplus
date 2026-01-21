/**
 * useTemplateAssets Hook
 * Manages loading and caching of template assets (fonts, images)
 */

import { useEffect, useReducer, useCallback } from 'react';
import { TemplateAssetLoadingState } from '../types/template';
import { getTemplateConfig } from '../config/templates';

type AssetAction =
  | { type: 'START_LOADING' }
  | { type: 'FONTS_LOADED' }
  | { type: 'IMAGES_PRELOADED' }
  | { type: 'SET_PROGRESS'; progress: number }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'RESET' };

const initialState: TemplateAssetLoadingState = {
  loading: false,
  error: null,
  fontsLoaded: false,
  imagesPreloaded: false,
  progress: 0,
};

function assetReducer(
  state: TemplateAssetLoadingState,
  action: AssetAction
): TemplateAssetLoadingState {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, loading: true, error: null, progress: 0 };

    case 'FONTS_LOADED':
      return { ...state, fontsLoaded: true, progress: 50 };

    case 'IMAGES_PRELOADED':
      return { ...state, imagesPreloaded: true, progress: 100 };

    case 'SET_PROGRESS':
      return { ...state, progress: action.progress };

    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

/**
 * Cache for loaded fonts and images to avoid duplicate loading
 */
const fontCache = new Set<string>();
const imageCache = new Map<string, boolean>();

/**
 * Load fonts for a template
 * Uses Google Fonts API links
 */
function loadFonts(templateId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const config = getTemplateConfig(templateId);
    if (!config?.assets.fonts.length) {
      resolve();
      return;
    }

    const fontUrls = config.assets.fonts.map((font) => font.url);
    let loadedCount = 0;

    fontUrls.forEach((url) => {
      if (fontCache.has(url)) {
        loadedCount++;
        if (loadedCount === fontUrls.length) resolve();
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;

      link.onload = () => {
        fontCache.add(url);
        loadedCount++;
        if (loadedCount === fontUrls.length) resolve();
      };

      link.onerror = () => {
        reject(new Error(`Failed to load font: ${url}`));
      };

      document.head.appendChild(link);
    });

    // If no fonts to load, resolve immediately
    if (fontUrls.length === 0) resolve();
  });
}

/**
 * Preload images for a template
 * Uses image lazy loading strategy
 */
function preloadImages(templateId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const config = getTemplateConfig(templateId);
    if (!config?.assets.images.length) {
      resolve();
      return;
    }

    const images = config.assets.images;
    let loadedCount = 0;

    images.forEach((imageConfig) => {
      if (imageCache.has(imageConfig.id)) {
        loadedCount++;
        if (loadedCount === images.length) resolve();
        return;
      }

      const img = new Image();

      img.onload = () => {
        imageCache.set(imageConfig.id, true);
        loadedCount++;
        if (loadedCount === images.length) resolve();
      };

      img.onerror = () => {
        // Log error but continue loading other images
        console.warn(
          `Failed to preload image: ${imageConfig.id} (${imageConfig.src})`
        );
        imageCache.set(imageConfig.id, false);
        loadedCount++;
        if (loadedCount === images.length) resolve();
      };

      img.src = imageConfig.src;
    });

    // If no images to load, resolve immediately
    if (images.length === 0) resolve();
  });
}

/**
 * useTemplateAssets Hook
 * Manages template asset loading with progress tracking
 * @param templateId - The template ID to load assets for
 * @returns Object with loading state and utility functions
 */
export function useTemplateAssets(templateId: string) {
  const [state, dispatch] = useReducer(assetReducer, initialState);

  // Load assets on mount or when templateId changes
  useEffect(() => {
    let isMounted = true;

    const loadAssets = async () => {
      try {
        dispatch({ type: 'START_LOADING' });

        // Load fonts first
        await loadFonts(templateId);
        if (!isMounted) return;
        dispatch({ type: 'FONTS_LOADED' });

        // Then preload images
        await preloadImages(templateId);
        if (!isMounted) return;
        dispatch({ type: 'IMAGES_PRELOADED' });
      } catch (error) {
        if (!isMounted) return;
        dispatch({
          type: 'SET_ERROR',
          error: error instanceof Error ? error.message : 'Unknown error loading assets',
        });
      }
    };

    loadAssets();

    return () => {
      isMounted = false;
    };
  }, [templateId]);

  // Get image URL with fallback
  const getImageUrl = useCallback((imageId: string): string | null => {
    const config = getTemplateConfig(templateId);
    const image = config?.assets.images.find((img) => img.id === imageId);
    return image?.src || null;
  }, [templateId]);

  // Get image with placeholder
  const getImageWithPlaceholder = useCallback(
    (imageId: string): { src: string | null; placeholder: string | null } => {
      const config = getTemplateConfig(templateId);
      const image = config?.assets.images.find((img) => img.id === imageId);
      return {
        src: image?.src || null,
        placeholder: image?.placeholder || null,
      };
    },
    [templateId]
  );

  // Check if all assets are loaded
  const isReady = state.fontsLoaded && state.imagesPreloaded && !state.loading;

  return {
    ...state,
    isReady,
    getImageUrl,
    getImageWithPlaceholder,
    reset: () => dispatch({ type: 'RESET' }),
  };
}
