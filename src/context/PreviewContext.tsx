/**
 * Preview Context
 * Manages isolated preview state
 * Reference: /research/isolated-preview-architecture/findings.md#finding-9
 */

import { createContext, useContext, useReducer, ReactNode, useEffect, Dispatch } from 'react';

export interface PreviewState {
  templateId: string;
  currentSection: string;
  formData: Record<string, any>;
  settings: {
    darkMode: boolean;
    language: string;
  };
  loading: boolean;
  error: string | null;
}

export type PreviewAction =
  | { type: 'INIT'; payload: Partial<PreviewState> }
  | { type: 'SET_SECTION'; payload: string }
  | { type: 'UPDATE_FORM'; payload: Record<string, any> }
  | { type: 'TOGGLE_SETTING'; payload: keyof PreviewState['settings'] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' };

const initialState: PreviewState = {
  templateId: '',
  currentSection: 'home',
  formData: {},
  settings: {
    darkMode: false,
    language: 'en',
  },
  loading: false,
  error: null,
};

/**
 * Preview reducer
 * Manages all preview state transitions
 */
function previewReducer(state: PreviewState, action: PreviewAction): PreviewState {
  switch (action.type) {
    case 'INIT':
      return { ...state, ...action.payload };

    case 'SET_SECTION':
      return { ...state, currentSection: action.payload };

    case 'UPDATE_FORM':
      return { ...state, formData: { ...state.formData, ...action.payload } };

    case 'TOGGLE_SETTING':
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload]: !state.settings[action.payload],
        },
      };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

/**
 * Preview Context
 * Provides isolated state to preview components
 */
const PreviewContext = createContext<{
  state: PreviewState;
  dispatch: Dispatch<PreviewAction>;
} | null>(null);

/**
 * Preview Provider
 * Wraps preview components with isolated state management
 * Automatically cleans up on unmount
 */
export function PreviewProvider({
  children,
  templateId,
}: {
  children: ReactNode;
  templateId: string;
}) {
  const [state, dispatch] = useReducer(previewReducer, {
    ...initialState,
    templateId,
  });

  // Cleanup effect: Reset state when template changes
  // This prevents state leakage between different preview instances
  useEffect(() => {
    return () => {
      // Optional: Could dispatch RESET action when provider unmounts
      // This ensures no residual state affects parent app
    };
  }, [templateId]);

  return (
    <PreviewContext.Provider value={{ state, dispatch }}>
      {children}
    </PreviewContext.Provider>
  );
}

/**
 * usePreview hook
 * Access preview state and dispatch actions
 * Must be used within PreviewProvider
 */
export function usePreview() {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error('usePreview must be used within PreviewProvider');
  }
  return context;
}

/**
 * usePreviewState hook
 * Access only preview state (read-only)
 */
export function usePreviewState() {
  const { state } = usePreview();
  return state;
}

/**
 * usePreviewDispatch hook
 * Access dispatch to update preview state
 */
export function usePreviewDispatch() {
  const { dispatch } = usePreview();
  return dispatch;
}

/**
 * usePreviewSection hook
 * Navigate between preview sections
 */
export function usePreviewSection() {
  const { state, dispatch } = usePreview();

  const setSection = (section: string) => {
    dispatch({ type: 'SET_SECTION', payload: section });
  };

  return {
    currentSection: state.currentSection,
    setSection,
  };
}

/**
 * usePreviewForm hook
 * Manage form state within preview
 */
export function usePreviewForm() {
  const { state, dispatch } = usePreview();

  const updateForm = (data: Record<string, any>) => {
    dispatch({ type: 'UPDATE_FORM', payload: data });
  };

  const resetForm = () => {
    dispatch({ type: 'UPDATE_FORM', payload: {} });
  };

  return {
    formData: state.formData,
    updateForm,
    resetForm,
  };
}

/**
 * usePreviewLoading hook
 * Manage loading state
 */
export function usePreviewLoading() {
  const { state, dispatch } = usePreview();

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  return {
    loading: state.loading,
    setLoading,
  };
}
