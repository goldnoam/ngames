import React, { useState, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';

const Header: React.FC = () => {
  const { t } = useSettings();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // A small threshold (10px) makes the effect feel responsive
      setIsScrolled(window.scrollY > 10);
    };

    // Add passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Base classes are shared in both states
  const headerBaseClasses = "sticky top-0 z-10 text-center transition-all duration-500 ease-in-out";
  const h1BaseClasses = "font-extrabold tracking-tight transition-all duration-500 ease-in-out transform hover:scale-105";

  // Conditional classes change based on the 'isScrolled' state
  const headerScrollClasses = isScrolled 
    ? "py-6 md:py-8 bg-gray-100/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg" 
    : "py-12 md:py-20 bg-transparent";
  
  const h1ScrollClasses = isScrolled
    ? "text-3xl sm:text-4xl md:text-5xl text-cyan-700 dark:text-cyan-500"
    : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cyan-600 dark:text-cyan-400";

  return (
    <header className={`${headerBaseClasses} ${headerScrollClasses}`}>
      <h1 
        className={`${h1BaseClasses} ${h1ScrollClasses}`}
        style={{ textShadow: '0 0 5px #06b6d4, 0 0 10px #06b6d4, 3px 3px 0px #0e7490, 6px 6px 0px rgba(0,0,0,0.2)' }}
      >
        {t('welcome')}
      </h1>
    </header>
  );
};

export default Header;