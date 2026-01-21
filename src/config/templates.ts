/**
 * Template Configuration Registry
 * Central registry of all available templates with their asset configurations
 */

import { TemplateConfig } from '../types/template';

/**
 * Example template configurations
 * In production, these would be loaded from a database or CMS
 */
export const templateRegistry: Record<string, TemplateConfig> = {
  'business-01': {
    id: 'business-01',
    name: 'Professional Business',
    description: 'Clean and professional business website template',
    category: 'business',
    version: '1.0.0',
    author: 'TigaPlus Templates',
    assets: {
      fonts: [
        {
          name: 'Poppins',
          url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap',
          weight: '400',
        },
        {
          name: 'Inter',
          url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
          weight: '400',
        },
      ],
      images: [
        {
          id: 'hero-bg',
          src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
          alt: 'Business hero background',
          placeholder:
            'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 600%22%3E%3Crect fill=%22%23f0f0f0%22 width=%221200%22 height=%22600%22/%3E%3C/svg%3E',
          width: 1200,
          height: 600,
        },
      ],
      favicon: 'https://example.com/favicon.ico',
    },
    metadata: {
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-21T00:00:00Z',
      tags: ['business', 'professional', 'corporate'],
    },
  },
  'portfolio-01': {
    id: 'portfolio-01',
    name: 'Creative Portfolio',
    description: 'Modern portfolio template for creative professionals',
    category: 'portfolio',
    version: '1.0.0',
    author: 'TigaPlus Templates',
    assets: {
      fonts: [
        {
          name: 'Poppins',
          url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap',
          weight: '400',
        },
      ],
      images: [
        {
          id: 'portfolio-1',
          src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80',
          alt: 'Portfolio item 1',
          width: 500,
          height: 400,
        },
      ],
    },
    metadata: {
      createdAt: '2026-01-05T00:00:00Z',
      updatedAt: '2026-01-21T00:00:00Z',
      tags: ['portfolio', 'creative', 'modern'],
    },
  },
  'ecommerce-01': {
    id: 'ecommerce-01',
    name: 'Shop Template',
    description: 'E-commerce template with product catalog',
    category: 'ecommerce',
    version: '1.0.0',
    author: 'TigaPlus Templates',
    assets: {
      fonts: [
        {
          name: 'Poppins',
          url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap',
          weight: '400',
        },
      ],
      images: [
        {
          id: 'product-1',
          src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
          alt: 'Product image',
          width: 400,
          height: 400,
        },
      ],
    },
    metadata: {
      createdAt: '2026-01-10T00:00:00Z',
      updatedAt: '2026-01-21T00:00:00Z',
      tags: ['ecommerce', 'shop', 'products'],
    },
  },
};

/**
 * Get template configuration by ID
 * @param templateId - The template ID to retrieve
 * @returns The template configuration or undefined if not found
 */
export function getTemplateConfig(templateId: string): TemplateConfig | undefined {
  return templateRegistry[templateId];
}

/**
 * Get all available template IDs
 * @returns Array of template IDs
 */
export function getAllTemplateIds(): string[] {
  return Object.keys(templateRegistry);
}

/**
 * Get templates by category
 * @param category - The template category
 * @returns Array of templates in that category
 */
export function getTemplatesByCategory(
  category: TemplateConfig['category']
): TemplateConfig[] {
  return Object.values(templateRegistry).filter((t) => t.category === category);
}

/**
 * Register a new template configuration
 * @param config - The template configuration to register
 */
export function registerTemplate(config: TemplateConfig): void {
  templateRegistry[config.id] = config;
}
