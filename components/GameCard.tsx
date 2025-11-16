import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const is3DModel = game.realTimePreviewUrl.endsWith('.glb');

  return (
    <a
      href={game.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 ease-in-out transform-gpu hover:-translate-y-2 hover:rotate-x-3 hover:-rotate-y-3"
    >
      <div className="relative">
        <img
          src={game.thumbnailUrl}
          alt={`Thumbnail for ${game.title}`}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
      </div>
      <div className="p-6">
        <div className="w-full h-48 mb-4 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          {is3DModel ? (
            <model-viewer
              src={game.realTimePreviewUrl}
              alt={`3D preview for ${game.title}`}
              camera-controls
              auto-rotate
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <img
              src={game.realTimePreviewUrl}
              alt={`Real-time preview for ${game.title}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">{game.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-base">{game.description}</p>
      </div>
    </a>
  );
};

export default GameCard;