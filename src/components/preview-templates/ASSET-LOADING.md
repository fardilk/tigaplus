# Asset Loading System

Complete guide for loading and managing template assets (fonts, images) in the preview system.

## Overview

The asset loading system provides:
- 🚀 Lazy font loading from Google Fonts
- 🖼️ Image preloading with placeholders
- 📦 Intelligent caching to prevent duplicate loads
- 📊 Progress tracking during asset loading
- ⚡ Optimized performance with intersection observer

## Components

### Template Configuration

Templates are defined in `/config/templates.ts` with asset configurations:

```typescript
const businessTemplate: TemplateConfig = {
  id: 'business-01',
  name: 'Professional Business',
  category: 'business',
  assets: {
    fonts: [
      {
        name: 'Poppins',
        url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700',
        weight: '400',
      },
    ],
    images: [
      {
        id: 'hero-bg',
        src: 'https://images.unsplash.com/...',
        alt: 'Hero background',
        placeholder: 'data:image/svg+xml,...',
        width: 1200,
        height: 600,
      },
    ],
  },
};
```

## Usage

### Basic Asset Loading

```tsx
import { useTemplateAssets } from './preview-templates';

function TemplatePreview({ templateId }: { templateId: string }) {
  const { isReady, loading, error, progress } = useTemplateAssets(templateId);

  if (error) return <div>Error loading assets: {error}</div>;
  if (loading) return <div>Loading ({progress}%)...</div>;
  if (!isReady) return <div>Preparing template...</div>;

  return <div>Template Ready!</div>;
}
```

### Using PreviewImage Component

```tsx
import { PreviewImage, useTemplateAssets } from './preview-templates';

function HeroSection({ templateId }: { templateId: string }) {
  const { getImageWithPlaceholder } = useTemplateAssets(templateId);
  const { src, placeholder } = getImageWithPlaceholder('hero-bg');

  return (
    <PreviewImage
      src={src || ''}
      placeholder={placeholder}
      lazy={true}
      aspectRatio="16/9"
      alt="Hero background"
    />
  );
}
```

### Getting Image URLs

```tsx
const { getImageUrl } = useTemplateAssets('business-01');
const heroUrl = getImageUrl('hero-bg');
```

## API Reference

### `useTemplateAssets(templateId: string)`

Hook for managing template asset loading.

**Returns:**
```typescript
{
  loading: boolean;           // Assets are loading
  error: string | null;       // Loading error message
  fontsLoaded: boolean;       // Fonts finished loading
  imagesPreloaded: boolean;   // Images finished preloading
  progress: number;           // 0-100 progress percentage
  isReady: boolean;           // All assets loaded and ready
  getImageUrl(id: string): string | null;  // Get image URL by ID
  getImageWithPlaceholder(id: string): { src: string | null; placeholder: string | null };
  reset(): void;              // Reset loading state
}
```

### `PreviewImage`

Image component with lazy loading and placeholder support.

**Props:**
```typescript
interface PreviewImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;                                    // Image URL
  placeholder?: string;                           // Placeholder image (base64 or URL)
  lazy?: boolean;                                 // Enable lazy loading (default: true)
  aspectRatio?: 'square' | '16/9' | '4/3' | '3/2' | number; // Preserve aspect ratio
}
```

**Example:**
```tsx
<PreviewImage
  src="https://example.com/image.jpg"
  placeholder="data:image/svg+xml,..."
  lazy={true}
  aspectRatio="16/9"
  alt="Description"
/>
```

### Template Configuration Functions

Located in `/config/templates.ts`:

```typescript
// Get template by ID
getTemplateConfig(templateId: string): TemplateConfig | undefined;

// Get all template IDs
getAllTemplateIds(): string[];

// Get templates by category
getTemplatesByCategory(category: 'business' | 'portfolio' | 'ecommerce' | 'blog' | 'landing'): TemplateConfig[];

// Register new template
registerTemplate(config: TemplateConfig): void;
```

## Performance Optimization

### Font Loading Strategy

1. **Deferred Loading**: Fonts are loaded asynchronously after initial render
2. **Caching**: Loaded fonts are cached to avoid duplicate requests
3. **Parallel Loading**: Multiple fonts load simultaneously
4. **Graceful Fallback**: System fonts are available while custom fonts load

### Image Loading Strategy

1. **Lazy Loading**: Images load only when entering viewport
2. **Placeholder**: Low-quality placeholder shown during loading
3. **Preloading**: Non-visible images preload after initial images
4. **Caching**: Preloaded images are cached in memory
5. **Error Handling**: Failed images don't break the template

## Best Practices

### 1. Define Asset URLs Correctly

```typescript
// ✅ Good: External URLs with proper format
assets: {
  fonts: [
    {
      url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap'
    }
  ]
}

// ❌ Bad: Missing protocol or malformed
assets: {
  fonts: [
    { url: 'fonts.googleapis.com/css2?family=Poppins' }
  ]
}
```

### 2. Provide Placeholders for Images

```typescript
// ✅ Good: Placeholder reduces CLS (Cumulative Layout Shift)
images: [
  {
    id: 'hero',
    src: 'https://...',
    placeholder: 'data:image/svg+xml,...',
  }
]

// ❌ Bad: No placeholder causes layout shift
images: [
  { id: 'hero', src: 'https://...' }
]
```

### 3. Set Image Dimensions

```typescript
// ✅ Good: Aspect ratio preserved
images: [
  {
    id: 'hero',
    src: 'https://...',
    width: 1200,
    height: 600,
  }
]

// ❌ Bad: Missing dimensions
images: [
  { id: 'hero', src: 'https://...' }
]
```

### 4. Handle Loading States

```typescript
// ✅ Good: Show meaningful feedback
const { isReady, progress, error } = useTemplateAssets(templateId);

if (error) return <ErrorMessage error={error} />;
if (!isReady) return <LoadingBar progress={progress} />;
return <Template />;

// ❌ Bad: No user feedback
if (!isReady) return null;
```

### 5. Use Lazy Loading for Non-Critical Images

```tsx
// ✅ Good: Lazy load below-fold images
<PreviewImage
  src={image.src}
  lazy={true}
  placeholder={image.placeholder}
/>

// ❌ Bad: Force load all images
<img src={image.src} />
```

## Caching Strategy

### Font Cache
- **Scope**: Global (application-wide)
- **Duration**: Browser session
- **Storage**: Memory (Set data structure)
- **Clear**: Browser cache clear or new session

### Image Cache
- **Scope**: Global (application-wide)
- **Duration**: Browser session
- **Storage**: Memory (Map data structure)
- **Clear**: Browser cache clear or new session

```typescript
// Caches are internal, no direct access needed
// Fonts loaded once per URL
// Images loaded once per ID
```

## Troubleshooting

### Fonts Not Loading

```typescript
// 1. Check URL format
const config = getTemplateConfig('template-id');
console.log(config?.assets.fonts[0].url);

// 2. Verify CORS headers
// Ensure external font URLs support CORS

// 3. Check browser console for network errors
```

### Images Not Showing

```typescript
// 1. Verify image URLs
const url = getImageUrl('image-id');
console.log('Image URL:', url);

// 2. Check image dimensions
// If aspectRatio doesn't match actual dimensions, may look distorted

// 3. Inspect placeholder
const { placeholder } = getImageWithPlaceholder('image-id');
console.log('Placeholder:', placeholder);
```

### Performance Issues

```typescript
// 1. Check network tab for slow font/image loads
// 2. Use preloadImages to warm cache before rendering
// 3. Consider reducing image count or using CDN
// 4. Monitor progress with: const { progress } = useTemplateAssets(...)
```

## Examples

### Complete Template with Assets

```tsx
import {
  PreviewProvider,
  PreviewLayout,
  PreviewNav,
  PreviewHero,
  PreviewCard,
  PreviewImage,
  PreviewButton,
  useTemplateAssets,
} from './preview-templates';

function BusinessTemplate({ templateId }: { templateId: string }) {
  return (
    <PreviewProvider templateId={templateId}>
      <BusinessTemplateContent templateId={templateId} />
    </PreviewProvider>
  );
}

function BusinessTemplateContent({ templateId }: { templateId: string }) {
  const { isReady, loading, progress, getImageWithPlaceholder } =
    useTemplateAssets(templateId);

  if (!isReady) {
    return <div>Loading... {progress}%</div>;
  }

  const { src: heroSrc, placeholder: heroPlaceholder } =
    getImageWithPlaceholder('hero-bg');

  return (
    <PreviewLayout
      nav={<PreviewNav logo="Business Co." />}
      hero={
        <PreviewHero
          title="Welcome to Our Business"
          subtitle="Professional Services"
        >
          <PreviewButton variant="primary">Get Started</PreviewButton>
        </PreviewHero>
      }
    >
      <PreviewCard hoverable padding="lg">
        <PreviewImage
          src={heroSrc || ''}
          placeholder={heroPlaceholder}
          aspectRatio="16/9"
          alt="Hero"
        />
        <h2>Our Services</h2>
        <p>We provide professional solutions...</p>
      </PreviewCard>
    </PreviewLayout>
  );
}
```

## Related Files

- `/config/templates.ts` - Template configurations
- `/types/template.ts` - Type definitions
- `/hooks/useTemplateAssets.ts` - Asset loading hook
- `/components/preview-templates/PreviewImage.tsx` - Image component
- `/components/preview-templates/README.md` - Component documentation
