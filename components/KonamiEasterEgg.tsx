import React, { useState, useEffect, useCallback } from 'react';

// The Konami Code sequence
const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

const fallingSymbols = ['♦️', '♣️', '♥️', '♠️', '💰', '🪙', '🎲'];
const NUM_SYMBOLS = 50; // Number of symbols to drop

const KonamiEasterEgg: React.FC = () => {
  const [userInput, setUserInput] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(false);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Ignore if the animation is already active
    if (isActivated) return;

    const key = event.key;
    const updatedInput = [...userInput, key];

    // Keep the input array trimmed to the length of the konami code
    const slicedInput = updatedInput.slice(-konamiCode.length);
    setUserInput(slicedInput);

    // Check for a match
    if (JSON.stringify(slicedInput) === JSON.stringify(konamiCode)) {
      setIsActivated(true);
      // Reset after animation
      setTimeout(() => {
        setIsActivated(false);
        setUserInput([]);
      }, 7000); // Animation duration + buffer
    }
  }, [userInput, isActivated]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const renderFallingSymbols = () => {
    const symbols = [];
    for (let i = 0; i < NUM_SYMBOLS; i++) {
      const style: React.CSSProperties = {
        position: 'absolute',
        top: '-10vh',
        left: `${Math.random() * 100}vw`,
        fontSize: `${1 + Math.random() * 1.5}rem`,
        animationName: 'fall',
        animationDuration: `${3 + Math.random() * 4}s`, // 3s to 7s
        animationDelay: `${Math.random() * 5}s`, // 0s to 5s delay
        animationTimingFunction: 'linear',
        animationIterationCount: '1',
        animationFillMode: 'forwards',
        transformOrigin: 'center center',
        textShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
      };
      symbols.push(
        <span key={i} style={style} aria-hidden="true">
          {fallingSymbols[Math.floor(Math.random() * fallingSymbols.length)]}
        </span>
      );
    }
    return symbols;
  };

  return (
    <>
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(${Math.random() > 0.5 ? '' : '-'}720deg);
            opacity: 0;
          }
        }
      `}</style>
      {isActivated && (
        <div 
          className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ zIndex: 9999 }}
          aria-live="polite"
        >
          {renderFallingSymbols()}
        </div>
      )}
    </>
  );
};

export default KonamiEasterEgg;
