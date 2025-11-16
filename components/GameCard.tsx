import React, { useState, useRef, useEffect } from 'react';
import { Game } from '../types';

// Extends HTMLElement to include properties specific to the model-viewer custom element.
interface ModelViewerElement extends HTMLElement {
  loaded?: boolean;
}

interface GameCardProps {
  game: Game;
}

const getPreviewType = (url: string): '3d' | 'video' | 'image' => {
  const lowercasedUrl = url.toLowerCase();
  if (lowercasedUrl.endsWith('.glb')) return '3d';
  if (lowercasedUrl.endsWith('.mp4') || lowercasedUrl.endsWith('.webm')) return 'video';
  return 'image';
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const previewType = getPreviewType(game.realTimePreviewUrl);

  // State and ref for 3D model viewer loading and errors
  const modelViewerRef = useRef<ModelViewerElement>(null);
  const [modelStatus, setModelStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    // Attach event listeners to the model-viewer custom element
    if (previewType === '3d' && modelViewerRef.current) {
      const modelViewerElement = modelViewerRef.current;
      
      const handleLoad = () => setModelStatus('loaded');
      const handleError = () => setModelStatus('error');
      
      modelViewerElement.addEventListener('load', handleLoad);
      modelViewerElement.addEventListener('error', handleError);
      
      // Check if model is already loaded, as the event might fire before the effect runs
      if (modelViewerElement.loaded) {
        handleLoad();
      }

      return () => {
        modelViewerElement.removeEventListener('load', handleLoad);
        modelViewerElement.removeEventListener('error', handleError);
      };
    }
  }, [previewType]);

  const renderPreview = () => {
    switch (previewType) {
      case '3d':
        return (
          <>
            {modelStatus === 'loading' && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">Loading 3D Preview...</div>
            )}
            {modelStatus === 'error' && (
              game.fallbackImageUrl ? (
                <img
                  src={game.fallbackImageUrl}
                  alt={`Preview for ${game.title}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="341"
                  height="192"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-red-500">3D Preview failed to load</div>
              )
            )}
            <model-viewer
              ref={modelViewerRef}
              src={game.realTimePreviewUrl}
              alt={`3D preview for ${game.title}`}
              camera-controls
              auto-rotate
              style={{ width: '100%', height: '100%', visibility: modelStatus === 'loaded' ? 'visible' : 'hidden', background: 'transparent' }}
            />
          </>
        );
      case 'video':
        return (
          <video
            src={game.realTimePreviewUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        );
      case 'image':
      default:
        return (
          <img
            src={game.realTimePreviewUrl}
            alt={`Real-time preview for ${game.title}`}
            className="w-full h-full object-cover"
            loading="lazy"
            width="341"
            height="192"
          />
        );
    }
  };

  return (
    <a
      href={game.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 ease-in-out transform-gpu hover:-translate-y-2 hover:rotate-x-3 hover:-rotate-y-3"
    >
      <div className="p-6">
        <div className="w-full h-48 mb-4 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center relative">
          {renderPreview()}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">{game.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-base">{game.description}</p>
      </div>
    </a>
  );
};

export default GameCard;