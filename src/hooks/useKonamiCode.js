import { useState, useEffect } from 'react';
import gsap from 'gsap';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export function useKonamiCode() {
  const [triggered, setTriggered] = useState(false);
  const [inputSequence, setInputSequence] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const newSequence = [...inputSequence, key].slice(-KONAMI_CODE.length);
      
      setInputSequence(newSequence);

      if (newSequence.join(',') === KONAMI_CODE.join(',')) {
        setTriggered(true);
        setInputSequence([]);
        
        // Auto-dismiss after 4 seconds
        setTimeout(() => setTriggered(false), 4000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputSequence]);

  const reset = () => {
    setTriggered(false);
    setInputSequence([]);
  };

  return { triggered, reset };
}
