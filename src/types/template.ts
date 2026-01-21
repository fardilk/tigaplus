/**
 * Template Configuration Types
 * Defines structure for template assets and metadata
 */

export interface TemplateFont {
  name: string;
  url: string;
  weight?: 'normal' | 'bold' | '400' | '500' | '600' | '700';
  style?: 'normal' | 'italic';
}

export interface TemplateImage {
  id: string;
  src: string;
  alt: string;
  placeholder?: string;
  width?: number;
  height?: number;
}

export interface TemplateAssets {
  fonts: TemplateFont[];
  images: TemplateImage[];
  favicon?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  category: 'business' | 'portfolio' | 'ecommerce' | 'blog' | 'landing';
  version: string;
  author?: string;
  assets: TemplateAssets;
  metadata?: {
    createdAt: string;
    updatedAt: string;
    tags?: string[];
  };
}

export interface TemplateAssetLoadingState {
  loading: boolean;
  error: string | null;
  fontsLoaded: boolean;
  imagesPreloaded: boolean;
  progress: number; // 0-100
}
