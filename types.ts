import React from 'react';

export interface Game {
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  realTimePreviewUrl: string;
}

// FIX: Moved the global JSX declaration for 'model-viewer' from GameCard.tsx to this file.
// This resolves a widespread issue where defining it within a component file was overriding
// the default JSX IntrinsicElements, causing TypeScript errors for all standard HTML tags.
// By simplifying the type definition for 'model-viewer', we ensure that the JSX.IntrinsicElements
// interface is augmented correctly, rather than being completely overridden.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.HTMLAttributes<HTMLElement> & {
        src: string;
        alt: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
      };
    }
  }
}
