import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

const Footer: React.FC = () => {
  const { t } = useSettings();

  return (
    <footer className="w-full py-8 mt-12 bg-gray-100 dark:bg-gray-900 text-center border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <p className="text-gray-500 dark:text-gray-400 mb-2">{t('copyright')}</p>
      <a
        href="mailto:gold.noam@gmail.com"
        className="text-cyan-600 dark:text-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors duration-300"
      >
        {t('feedback')}
      </a>
    </footer>
  );
};

export default Footer;