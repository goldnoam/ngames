import React from 'react';
import Header from './components/Header';
import GameCard from './components/GameCard';
import Footer from './components/Footer';
import Settings from './components/Settings';
import { Game } from './types';
import { useSettings } from './contexts/SettingsContext';

const App: React.FC = () => {
  const { t } = useSettings();

  const games: Game[] = [
    {
      title: t('zombieTitle'),
      description: t('zombieDesc'),
      url: 'https://zombie.vercel.app/',
      thumbnailUrl: 'https://images.unsplash.com/photo-1610615113062-0515494d4d16?q=80&w=1974&auto=format&fit=crop',
      realTimePreviewUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    },
    {
      title: t('skiTitle'),
      description: t('skiDesc'),
      url: 'https://skigame.vercel.app/',
      thumbnailUrl: 'https://images.unsplash.com/photo-1549984223-a75d5b72183e?q=80&w=1964&auto=format&fit=crop',
      realTimePreviewUrl: 'https://cdn.glitch.global/6a815255-8602-4581-92d7-62389148d447/snowboarder.glb?v=1680016538181',
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col font-sans transition-colors duration-300">
      <Settings />
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 [perspective:1000px]">
          {games.map((game) => (
            <GameCard key={game.title} game={game} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
