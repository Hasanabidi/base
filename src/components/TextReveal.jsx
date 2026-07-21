import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ text, as = 'p', stagger = 40, className = '' }) {
  const Component = as;
  const words = text.split(' ');
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordsElements = containerRef.current.querySelectorAll('.word');
      
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.fromTo(wordsElements,
            { 
              y: '100%', 
              rotate: 3,
              opacity: 0 
            },
            { 
              y: '0%', 
              rotate: 0,
              opacity: 1,
              duration: 0.6,
              stagger: stagger / 1000,
              ease: 'power3.out'
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [stagger]);

  return (
    <Component ref={containerRef} className={`overflow-hidden ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className="word inline-block overflow-hidden"
          style={{ display: 'inline-block' }}
        >
          <span className="inline-block">{word}</span>
          {index < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Component>
  );
}
