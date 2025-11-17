// FIX: Changed to a default import to align with the rest of the project and resolve module augmentation errors.
import React from 'react';

export interface Game {
  title: string;
  description: string;
  url: string;
  realTimePreviewUrl: string;
  fallbackImageUrl?: string;
}

// By augmenting the 'react' module, we can add support for custom elements like 'model-viewer' to the JSX namespace.
// FIX: The JSX namespace augmentation was incorrectly defined using `declare global`, which was overwriting
// React's built-in types for standard HTML elements and causing numerous errors. This has been corrected
// by using `declare module 'react'` to properly augment React's JSX types, which merges the custom
// 'model-viewer' element with the standard intrinsic elements.
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
