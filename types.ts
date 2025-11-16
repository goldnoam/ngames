// FIX: Removed the failing `/// <reference types="react" />` directive. The `import React` statement is sufficient to load React's types, which allows for the correct augmentation of the global JSX namespace. This resolves the errors where standard HTML elements were not recognized.
import React from 'react';

export interface Game {
  title: string;
  description: string;
  url: string;
  realTimePreviewUrl: string;
  fallbackImageUrl?: string;
}

// The import of React above ensures that TypeScript loads React's global JSX
// namespace before this file is processed. This allows the `IntrinsicElements`
// interface to be correctly augmented, adding support for the 'model-viewer'
// custom element without overwriting existing HTML elements like 'div', 'h1', etc.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
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
