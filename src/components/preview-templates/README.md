# Preview Templates Component Library

This folder contains all isolated preview-specific components for the "web within web" architecture. These components are completely independent from the parent TigaPlus UI library and use their own design system.

## Overview

The preview component library provides 8 core components designed to render template previews as fully isolated websites:

1. **PreviewButton** - Interactive button component with multiple variants
2. **PreviewCard** - Container component for content blocks
3. **PreviewInput** - Form input with validation support
4. **PreviewNav** - Navigation/header component
5. **PreviewHero** - Large banner/hero section
6. **PreviewFooter** - Footer with multi-column layout
7. **PreviewLayout** - Master layout wrapper (nav + hero + content + footer)
8. **PreviewModal** - Accessible dialog/modal component

## Key Features

- ✅ **Complete CSS Isolation** - Uses CSS Modules to prevent style inheritance from parent
- ✅ **Independent Design System** - Uses preview theme with distinct colors (warm coral #FF6B6B instead of parent blue)
- ✅ **Type-Safe** - Full TypeScript support with exported interfaces
- ✅ **Accessible** - WCAG AA compliant with proper ARIA attributes
- ✅ **Responsive** - Supports mobile, tablet, desktop, and ultra-wide viewports
- ✅ **Performance Optimized** - CSS containment and efficient styling
- ✅ **forwardRef Support** - All components support ref forwarding

## Architecture

### File Structure
```
preview-templates/
├── README.md                 # This file
├── types.ts                  # Shared type definitions
├── index.ts                  # Central export point
├── PreviewButton.tsx         # Button component
├── button.module.css         # Button styles
├── PreviewCard.tsx           # Card component
├── card.module.css           # Card styles
├── PreviewInput.tsx          # Input component
├── input.module.css          # Input styles
├── PreviewNav.tsx            # Navigation component
├── nav.module.css            # Navigation styles
├── PreviewHero.tsx           # Hero component
├── hero.module.css           # Hero styles
├── PreviewFooter.tsx         # Footer component
├── footer.module.css         # Footer styles
├── PreviewLayout.tsx         # Layout component
├── layout.module.css         # Layout styles
├── PreviewModal.tsx          # Modal component
└── modal.module.css          # Modal styles
```

### Theme System

All components use CSS variables from the preview theme system:

```typescript
import { generateCSSVariables, getPreviewTheme } from './preview-theme';

const theme = getPreviewTheme('template-id');
const cssVars = generateCSSVariables(theme);
```

**Available CSS Variables:**
- Colors: `--preview-primary`, `--preview-secondary`, `--preview-accent`, etc.
- Typography: `--preview-heading-family`, `--preview-body-family`
- Spacing: `--preview-spacing-xs` through `--preview-spacing-xxl`
- Shadows: `--preview-shadow-sm` through `--preview-shadow-xl`
- Radius: `--preview-radius-sm`, `--preview-radius-md`, `--preview-radius-lg`, `--preview-radius-full`
- Transitions: `--preview-transition-fast`, `--preview-transition-normal`, `--preview-transition-slow`

## Usage Examples

### Basic Button
```tsx
import { PreviewButton } from './preview-templates';

<PreviewButton variant="primary" size="md">
  Click Me
</PreviewButton>
```

### Card Layout
```tsx
import { PreviewCard, PreviewLayout, PreviewNav } from './preview-templates';

<PreviewLayout
  nav={<PreviewNav items={navItems} />}
  hero={<div>Hero content</div>}
  footer={<div>Footer</div>}
>
  <PreviewCard hoverable padding="lg">
    <h2>Card Title</h2>
    <p>Card content goes here</p>
  </PreviewCard>
</PreviewLayout>
```

### Form Input
```tsx
import { PreviewInput } from './preview-templates';

<PreviewInput
  label="Email"
  type="email"
  placeholder="your@email.com"
  size="md"
  error={errors.email}
  helperText="We'll never share your email"
/>
```

### Modal Dialog
```tsx
import { useState } from 'react';
import { PreviewModal, PreviewButton } from './preview-templates';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PreviewButton onClick={() => setIsOpen(true)}>
        Open Modal
      </PreviewButton>
      <PreviewModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
      >
        <p>Are you sure you want to continue?</p>
      </PreviewModal>
    </>
  );
}
```

### State Management with Context
```tsx
import {
  PreviewProvider,
  usePreviewForm,
  usePreviewSection,
} from './preview-templates';

function PreviewApp() {
  return (
    <PreviewProvider templateId="business-template-01">
      <TemplateContent />
    </PreviewProvider>
  );
}

function TemplateContent() {
  const { currentSection, setSection } = usePreviewSection();
  const { formData, updateForm } = usePreviewForm();

  return (
    <div>
      {/* Content */}
    </div>
  );
}
```

## Component Props

### PreviewButton
```typescript
interface PreviewButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}
```

### PreviewCard
```typescript
interface PreviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}
```

### PreviewInput
```typescript
interface PreviewInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}
```

### PreviewNav
```typescript
interface PreviewNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: Array<{ id: string; label: string; href?: string }>;
  logo?: React.ReactNode;
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}
```

### PreviewHero
```typescript
interface PreviewHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  actions?: React.ReactNode;
}
```

### PreviewFooter
```typescript
interface PreviewFooterProps extends React.HTMLAttributes<HTMLElement> {
  columns?: Array<{
    title: string;
    items: Array<{ label: string; href?: string }>;
  }>;
  bottomSection?: React.ReactNode;
  copyright?: string;
}
```

### PreviewLayout
```typescript
interface PreviewLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  nav?: React.ReactNode;
  hero?: React.ReactNode;
  footer?: React.ReactNode;
  fullHeight?: boolean;
}
```

### PreviewModal
```typescript
interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  closeButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

## Styling & CSS Variables

All components use CSS variables for theming. To apply CSS variables to a component:

1. Get the theme: `getPreviewTheme(templateId)`
2. Generate CSS variables: `generateCSSVariables(theme)`
3. Apply to container element's style attribute

```tsx
const theme = getPreviewTheme('template-id');
const cssVars = generateCSSVariables(theme);

<div style={cssVars}>
  {/* Components use these CSS variables */}
</div>
```

## Accessibility

All components follow WCAG AA standards:

- ✅ Proper semantic HTML
- ✅ ARIA attributes where needed
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Color contrast compliance
- ✅ Screen reader friendly

## Performance Notes

- Components use CSS Modules for isolated styling
- CSS containment (`contain: layout style paint`) for 10-20% performance boost
- No external dependencies - pure React + CSS
- All components support React.forwardRef for optimization

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

When adding new components:

1. Create component TypeScript file with types
2. Create corresponding CSS Module
3. Add to index.ts exports
4. Update this README
5. Follow existing component patterns for consistency

## Related Files

- **State Management**: `/src/context/PreviewContext.tsx`
- **Theme System**: `/src/styles/preview-theme.ts`
- **CSS Reset**: `/src/styles/preview-reset.css`
- **Implementation Roadmap**: `/IMPLEMENTATION-ROADMAP.md`
