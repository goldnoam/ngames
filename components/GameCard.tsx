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
  const [progress, setProgress] = useState(0);

  // State for video loading indicator
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  useEffect(() => {
    // Attach event listeners to the model-viewer custom element
    if (previewType === '3d' && modelViewerRef.current) {
      const modelViewerElement = modelViewerRef.current;
      
      const handleLoad = () => {
        setProgress(100);
        setModelStatus('loaded');
      };
      const handleError = () => setModelStatus('error');
      const handleProgress = (event: any) => {
        const p = Math.round(event.detail.totalProgress * 100);
        setProgress(p > 100 ? 100 : p); // Cap progress at 100
      };
      
      modelViewerElement.addEventListener('load', handleLoad);
      modelViewerElement.addEventListener('error', handleError);
      modelViewerElement.addEventListener('progress', handleProgress);
      
      // Check if model is already loaded, as the event might fire before the effect runs
      if (modelViewerElement.loaded) {
        handleLoad();
      }

      return () => {
        modelViewerElement.removeEventListener('load', handleLoad);
        modelViewerElement.removeEventListener('error', handleError);
        modelViewerElement.removeEventListener('progress', handleProgress);
      };
    }
  }, [previewType]);

  const renderPreview = () => {
    switch (previewType) {
      case '3d':
        const radius = 30;
        const stroke = 4;
        const normalizedRadius = radius - stroke * 2;
        const circumference = normalizedRadius * 2 * Math.PI;
        const strokeDashoffset = circumference - (progress / 100) * circumference;

        return (
          <>
            {modelStatus === 'loading' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 transition-opacity duration-300">
                <div className="relative flex items-center justify-center">
                  <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="-rotate-90 transition-all duration-300"
                  >
                    <circle
                      className="text-gray-300 dark:text-gray-700"
                      stroke="currentColor"
                      fill="transparent"
                      strokeWidth={stroke}
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                    />
                    <circle
                      className="text-cyan-600"
                      stroke="currentColor"
                      fill="transparent"
                      strokeWidth={stroke}
                      strokeDasharray={circumference + ' ' + circumference}
                      style={{ strokeDashoffset, strokeLinecap: 'round' }}
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                    />
                  </svg>
                  <span className="absolute text-sm font-bold text-cyan-600 dark:text-cyan-400">
                    {`${progress}%`}
                  </span>
                </div>
                 <p className="text-sm font-medium mt-3 animate-pulse">Loading 3D Preview...</p>
              </div>
            )}
            {modelStatus === 'error' && (
              game.fallbackImageUrl ? (
                <img
                  src={game.fallbackImageUrl}
                  alt={`Preview for ${game.title}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
                  loading="lazy"
                  width="341"
                  height="192"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    {/* A combination of a 3D cube icon and an X mark to signify a model loading error */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9.75L12 2.25 3 7.5m9 5.25V21" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <p className="font-semibold">Preview Unavailable</p>
                </div>
              )
            )}
            <model-viewer
              ref={modelViewerRef}
              src={game.realTimePreviewUrl}
              alt={`3D preview for ${game.title}`}
              camera-controls
              auto-rotate
              className="w-full h-full group-hover:scale-110 transition-transform duration-300 ease-in-out"
              style={{ visibility: modelStatus === 'loaded' ? 'visible' : 'hidden', background: 'transparent', transition: 'visibility 0.3s ease-in-out' }}
            />
          </>
        );
      case 'video':
        return (
          <>
            {isVideoLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <svg className="animate-spin h-8 w-8 text-cyan-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
            <video
              src={game.realTimePreviewUrl}
              autoPlay
              loop
              muted
              playsInline
              onCanPlay={() => setIsVideoLoading(false)}
              className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-300 ease-in-out ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`}
            >
              Your browser does not support the video tag.
            </video>
          </>
        );
      case 'image':
      default:
        return (
          <img
            src={game.realTimePreviewUrl}
            alt={`Real-time preview for ${game.title}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
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
      className="block group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 ease-in-out transform-gpu hover:-translate-y-1 hover:rotate-x-2 hover:-rotate-y-2"
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