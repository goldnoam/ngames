export interface Game {
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  realTimePreviewUrl: string;
}

// FIX: Corrected the global JSX type definition for 'model-viewer'.
// The previous method of defining this type was overriding all standard HTML element types,
// causing widespread TypeScript errors. Using inline `import('react')` types ensures that
// the JSX.IntrinsicElements interface is augmented correctly without this issue.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': import('react').DetailedHTMLProps<
        import('react').HTMLAttributes<HTMLElement> & {
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
