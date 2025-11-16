import React from 'react';

export interface Game {
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  realTimePreviewUrl: string;
}

// FIX: Corrected the global JSX type definition for 'model-viewer'.
// The previous declaration was overriding all standard HTML element types, causing widespread
// TypeScript errors. Using `React.DetailedHTMLProps` ensures that the JSX.IntrinsicElements
// interface is augmented correctly without losing the default types for elements like 'div', 'h1', etc.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string;
          alt: string;
          'camera-controls'?: boolean;
          'auto-rotate'?: boolean;
        },
        HTMLElement
      >;
    }
  }
}
