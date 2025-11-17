import React from 'react';
import { Game } from '../types';

interface SocialShareButtonsProps {
  game: Game;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ game }) => {
  const shareUrl = encodeURIComponent(game.url);
  const shareTitle = encodeURIComponent(game.title);
  const shareDescription = encodeURIComponent(`Check out "${game.title}" - ${game.description}`);

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareDescription}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}&summary=${shareDescription}`,
  };

  const socialPlatforms = [
    {
      name: 'Twitter',
      url: socialLinks.twitter,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      hoverClass: 'hover:text-sky-500',
    },
    {
      name: 'Facebook',
      url: socialLinks.facebook,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z" />
        </svg>
      ),
      hoverClass: 'hover:text-blue-600',
    },
    {
      name: 'LinkedIn',
      url: socialLinks.linkedin,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.5 2.5-2.5c1.6 0 2.5 1.2 2.5 2.5s-1 2.5-2.5 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7.4c0-1.2 0-2.8-2-2.8z" />
        </svg>
      ),
      hoverClass: 'hover:text-blue-700',
    },
  ];

  const handleShareClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    // Prevent any parent links from being triggered
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end space-x-3">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Share:</span>
        {socialPlatforms.map((platform) => (
            <a
            key={platform.name}
            href={platform.url}
            onClick={(e) => handleShareClick(e, platform.url)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share ${game.title} on ${platform.name}`}
            className={`text-gray-400 dark:text-gray-500 transition-all duration-300 ${platform.hoverClass} transform hover:scale-125`}
            >
            {platform.icon}
            </a>
        ))}
    </div>
  );
};

export default SocialShareButtons;
