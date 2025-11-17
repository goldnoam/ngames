import React from 'react';

export interface Game {
  title: string;
  description: string;
  url: string;
  realTimePreviewUrl: string;
  fallbackImageUrl?: string;
}

// By augmenting the 'react' module, we can add support for custom elements like 'model-viewer' to the JSX namespace.
declare module 'react' {
  namespace JSX {
    // Augmenting the IntrinsicElements interface to include the 'model-viewer' custom element.
    // This adds our custom element type by merging with the standard HTML element types provided by React.
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
