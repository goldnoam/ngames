export interface Game {
  title: string;
  description: string;
  url: string;
  realTimePreviewUrl: string;
  fallbackImageUrl?: string;
}

// FIX: By removing the module-level `import React from 'react'` and using inline
// `import('react')` for types, we ensure TypeScript correctly augments the global
// JSX namespace instead of overwriting it. This resolves the errors where standard
// HTML elements were not being recognized.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': import('react').DetailedHTMLProps<
        import('react').HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src: string;
        alt: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
      };
    }
  }
}
