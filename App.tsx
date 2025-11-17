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
      realTimePreviewUrl: 'https://poly.pizza/download/m/3UAMP5w3wG/Poly.glb',
      fallbackImageUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: t('skiTitle'),
      description: t('skiDesc'),
      url: 'https://skigame.vercel.app/',
      realTimePreviewUrl: 'https://videos.pexels.com/video-files/3840330/3840330-hd_1280_720_25fps.mp4',
      fallbackImageUrl: 'https://cdn.pixabay.com/photo/2016/12/30/21/53/background-1942091_960_720.jpg',
    },
    {
      title: t('astroTitle'),
      description: t('astroDesc'),
      url: 'https://astrogame.vercel.app/',
      realTimePreviewUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
      fallbackImageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_960_720.jpg',
    },
    {
      title: t('digTitle'),
      description: t('digDesc'),
      url: 'https://diggame.vercel.app/',
      realTimePreviewUrl: 'https://poly.pizza/download/m/69P44c_3-z2/Poly.glb',
      fallbackImageUrl: 'https://images.pexels.com/photos/1903965/pexels-photo-1903965.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: t('charityTitle'),
      description: t('charityDesc'),
      url: 'https://charitygame.vercel.app/',
      realTimePreviewUrl: 'https://poly.pizza/download/m/b5H4P5sWeD/Poly.glb',
      fallbackImageUrl: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600',
    }
  ];

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col font-sans transition-colors duration-300">
      <Settings />
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 [perspective:1000px]">
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