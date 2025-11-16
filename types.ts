import React from 'react';

export interface Game {
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  realTimePreviewUrl: string;
}

// FIX: Corrected the global JSX type definition for 'model-viewer'.
// The previous definition was overriding all standard HTML element types instead of augmenting them.
// This version correctly augments the JSX.IntrinsicElements interface.
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
