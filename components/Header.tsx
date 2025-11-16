import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

const Header: React.FC = () => {
  const { t } = useSettings();

  return (
    <header className="py-12 md:py-20 text-center bg-transparent">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-cyan-600 dark:text-cyan-400 transition-all duration-300 ease-in-out transform hover:scale-105"
          style={{ textShadow: '0 0 5px #06b6d4, 0 0 10px #06b6d4, 3px 3px 0px #0e7490, 6px 6px 0px rgba(0,0,0,0.2)' }}>
        {t('welcome')}
      </h1>
    </header>
  );
};

export default Header;