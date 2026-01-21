/**
 * Preview Components Export Index
 * Central export point for all preview-specific components
 */

// Components
export { PreviewButton, type PreviewButtonProps } from './PreviewButton';
export { PreviewCard, type PreviewCardProps } from './PreviewCard';
export { PreviewInput, type PreviewInputProps } from './PreviewInput';
export {
  PreviewNav,
  type PreviewNavProps,
  type PreviewNavItem,
} from './PreviewNav';
export { PreviewHero, type PreviewHeroProps } from './PreviewHero';
export { PreviewFooter, type PreviewFooterProps } from './PreviewFooter';
export { PreviewLayout, type PreviewLayoutProps } from './PreviewLayout';
export { PreviewModal, type PreviewModalProps } from './PreviewModal';
export { PreviewImage, type PreviewImageProps } from './PreviewImage';
export { PreviewFloatingMenu, type PreviewFloatingMenuProps } from './PreviewFloatingMenu';

// Re-export context and hooks
export {
  PreviewProvider,
  usePreview,
  usePreviewState,
  usePreviewDispatch,
  usePreviewSection,
  usePreviewForm,
  usePreviewLoading,
  type PreviewState,
  type PreviewAction,
} from '../../context/PreviewContext';

// Re-export theme utilities
export {
  getPreviewTheme,
  generateCSSVariables,
  defaultPreviewTheme,
  type PreviewTheme,
} from '../../styles/preview-theme';

// Re-export template types and utilities
export {
  getTemplateConfig,
  getAllTemplateIds,
  getTemplatesByCategory,
  registerTemplate,
} from '../../config/templates';
export type {
  TemplateConfig,
  TemplateAssets,
  TemplateFont,
  TemplateImage,
  TemplateAssetLoadingState,
} from '../../types/template';

// Re-export hooks
export { useTemplateAssets } from '../../hooks/useTemplateAssets';
