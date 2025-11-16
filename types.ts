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
    // Fix: Using `extends React.JSX.IntrinsicElements` was incorrectly overwriting the original
    // IntrinsicElements interface, causing all standard HTML element types to be lost. By removing
    // the `extends` clause, we now correctly use TypeScript's declaration merging to augment
    // the interface with our custom 'model-viewer' element.
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
