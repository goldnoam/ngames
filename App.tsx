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
      thumbnailUrl: 'https://images.unsplash.com/photo-1610424220202-a8b234994157?q=80&w=1935&auto=format&fit=crop',
      realTimePreviewUrl: 'https://via.placeholder.com/300x200.png?text=Zombi+Game+Preview',
    },
    {
      title: t('skiTitle'),
      description: t('skiDesc'),
      url: 'https://skigame.vercel.app/',
      thumbnailUrl: 'https://images.unsplash.com/photo-1549488344-cbb6c144a41e?q=80&w=2070&auto=format&fit=crop',
      realTimePreviewUrl: 'https://via.placeholder.com/300x200.png?text=Ski+Game+Preview',
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