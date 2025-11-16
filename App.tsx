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
      realTimePreviewUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
      fallbackImageUrl: 'https://cdn.pixabay.com/photo/2020/10/26/18/14/zombie-5688344_960_720.jpg',
    },
    {
      title: t('skiTitle'),
      description: t('skiDesc'),
      url: 'https://skigame.vercel.app/',
      realTimePreviewUrl: 'https://videos.pexels.com/video-files/3840330/3840330-hd_1280_720_25fps.mp4',
      fallbackImageUrl: 'https://cdn.pixabay.com/photo/2016/12/30/21/53/background-1942091_960_720.jpg',
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