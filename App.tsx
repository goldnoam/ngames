
import React, { useState } from 'react';
import Header from './components/Header';
import GameCard from './components/GameCard';
import Footer from './components/Footer';
import Settings from './components/Settings';
import KonamiEasterEgg from './components/KonamiEasterEgg';
import CategoryFilter from './components/CategoryFilter';
import { Game, Category } from './types';
import { useSettings } from './contexts/SettingsContext';
import ParticleBackground from './components/ParticleBackground';

const App: React.FC = () => {
  const { t } = useSettings();

  const games: Game[] = [
    {
      title: t('zombieTitle'),
      description: t('zombieDesc'),
      url: 'https://zombie.vercel.app/',
      realTimePreviewUrl: 'https://poly.pizza/download/m/3UAMP5w3wG/Poly.glb',
      fallbackImageUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Action',
    },
    {
      title: t('skiTitle'),
      description: t('skiDesc'),
      url: 'https://skigame.vercel.app/',
      realTimePreviewUrl: 'https://videos.pexels.com/video-files/3840330/3840330-hd_1280_720_25fps.mp4',
      fallbackImageUrl: 'https://cdn.pixabay.com/photo/2016/12/30/21/53/background-1942091_960_720.jpg',
      category: 'Simulation',
    },
    {
      title: t('astroTitle'),
      description: t('astroDesc'),
      url: 'https://astrogame.vercel.app/',
      realTimePreviewUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
      fallbackImageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_960_720.jpg',
      category: 'Adventure',
    },
    {
      title: t('digTitle'),
      description: t('digDesc'),
      url: 'https://diggame.vercel.app/',
      realTimePreviewUrl: 'https://poly.pizza/download/m/69P44c_3-z2/Poly.glb',
      fallbackImageUrl: 'https://images.pexels.com/photos/1903965/pexels-photo-1903965.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Adventure',
    },
    {
      title: t('charityTitle'),
      description: t('charityDesc'),
      url: 'https://charitygame.vercel.app/',
      realTimePreviewUrl: 'https://poly.pizza/download/m/b5H4P5sWeD/Poly.glb',
      fallbackImageUrl: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Strategy',
    },
    {
      title: t('chipsTitle'),
      description: t('chipsDesc'),
      url: 'https://chipsgame.vercel.app/',
      realTimePreviewUrl: 'https://poly.pizza/download/m/6_f9sS3P0f_/Poly.glb',
      fallbackImageUrl: 'https://images.pexels.com/photos/327969/pexels-photo-327969.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Casino',
    },
    {
      title: t('pizzaTitle'),
      description: t('pizzaDesc'),
      url: 'https://pizzang.vercel.app/',
      realTimePreviewUrl: 'https://poly.pizza/download/m/2X_8-a5WqP/Poly.glb',
      fallbackImageUrl: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Simulation',
    },
    {
      title: t('chemistryTitle'),
      description: t('chemistryDesc'),
      url: 'https://chemistrygame.vercel.app/',
      realTimePreviewUrl: 'https://poly.pizza/download/m/fI-28N0PTD/Poly.glb',
      fallbackImageUrl: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Simulation',
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Extract unique categories from the games list
  const categories = [...new Set(games.map(game => game.category))] as Category[];

  const filteredGames = games.filter(game => {
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = game.title.toLowerCase().includes(searchLower) || 
                          game.description.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col font-sans transition-colors duration-300">
      <ParticleBackground />
      <div className="relative z-10 flex flex-col flex-grow">
        <Settings />
        <KonamiEasterEgg />
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          
          {/* Search Input */}
          <div className="max-w-md mx-auto mb-8 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-full leading-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
            />
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 [perspective:1000px]">
              {filteredGames.map((game) => (
                <GameCard key={game.title} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">{t('noGamesFoundTitle')}</h2>
              <p className="text-gray-500 dark:text-gray-400">{t('noGamesFoundDesc')}</p>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
