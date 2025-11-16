// Using `import * as React` is a more robust way to ensure the React namespace is
// available for JSX type augmentation, regardless of the `esModuleInterop` compiler option.
// This prevents the issue where augmenting JSX.IntrinsicElements overwrites the
// standard HTML element types instead of merging with them.
import * as React from 'react';

export interface Game {
  title: string;
  description: string;
  url: string;
  realTimePreviewUrl: string;
  fallbackImageUrl?: string;
}

// By augmenting the global JSX namespace, we can add support for custom elements like 'model-viewer'.
declare global {
  namespace JSX {
    // Augmenting the IntrinsicElements interface to include the 'model-viewer' custom element.
    // This adds our custom element type without overriding the standard HTML element types provided by React.
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
