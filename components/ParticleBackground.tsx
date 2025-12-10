import React, { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { useSettings } from '../contexts/SettingsContext';

const ParticleBackground: React.FC = () => {
  const [init, setInit] = useState(false);
  const { theme } = useSettings();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particleOptions = useMemo(() => {
    const particleColor = theme === 'dark' ? '#ffffff' : '#374151'; // white for dark, gray-700 for light
    const linkColor = theme === 'dark' ? '#4b5563' : '#9ca3af'; // gray-600 for dark, gray-400 for light

    return {
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'repulse',
          },
          onClick: {
            enable: true,
            mode: 'push',
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
          push: {
            quantity: 4,
          },
        },
      },
      particles: {
        color: {
          value: particleColor,
        },
        links: {
          color: linkColor,
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: 'none' as const,
          enable: true,
          outModes: {
            default: 'bounce' as const,
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 40,
        },
        opacity: {
          value: 0.3,
        },
        shape: {
          type: 'circle' as const,
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    };
  }, [theme]);
  
  if (init) {
    return (
        <Particles
          id="tsparticles"
          options={particleOptions}
          className="absolute inset-0 z-0"
        />
    );
  }

  return null;
};

export default ParticleBackground;