// FIX: Using 'import * as React' ensures that the React namespace and its associated
// JSX type definitions are correctly loaded before attempting to augment the
// JSX.IntrinsicElements interface. This resolves an issue where the interface was
// being overwritten instead of augmented, causing standard HTML elements to be unrecognized.
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
