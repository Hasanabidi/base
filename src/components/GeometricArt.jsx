import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function GeometricArt() {
  const root = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-art="line"]', {
        strokeDashoffset: (i, el) => el.getTotalLength?.() || 800,
        duration: 1.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
      });
      gsap.from('[data-art="shape"]', {
        opacity: 0,
        scale: 0.85,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
      });
      gsap.from('[data-art="dot"]', {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        delay: 0.8,
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={root} className="w-full">
      <svg viewBox="0 0 1200 320" className="w-full h-auto" fill="none" preserveAspectRatio="xMidYMid meet">
        {/* Diagonal lines */}
        <line data-art="line" x1="0" y1="280" x2="1200" y2="40" stroke="#0047FF" strokeWidth="1" />
        <line data-art="line" x1="0" y1="160" x2="1200" y2="200" stroke="#000000" strokeWidth="1" />
        <line data-art="line" x1="0" y1="40" x2="1200" y2="280" stroke="#000000" strokeWidth="1" strokeDasharray="4 4" />
        <line data-art="line" x1="200" y1="0" x2="400" y2="320" stroke="#0047FF" strokeWidth="1" />
        <line data-art="line" x1="800" y1="0" x2="1000" y2="320" stroke="#0047FF" strokeWidth="1" />

        {/* Horizontal lines */}
        <line data-art="line" x1="0" y1="160" x2="1200" y2="160" stroke="#000000" strokeWidth="1" opacity="0.15" />

        {/* Rectangles */}
        <rect data-art="shape" x="150" y="60" width="180" height="120" stroke="#000000" strokeWidth="1" fill="none" />
        <rect data-art="shape" x="450" y="100" width="140" height="100" stroke="#0047FF" strokeWidth="1" fill="#0047FF" fillOpacity="0.08" />
        <rect data-art="shape" x="750" y="40" width="100" height="200" stroke="#000000" strokeWidth="1" fill="none" />

        {/* Circles */}
        <circle data-art="shape" cx="1000" cy="160" r="50" stroke="#0047FF" strokeWidth="1" fill="none" />
        <circle data-art="shape" cx="1000" cy="160" r="20" stroke="#000000" strokeWidth="1" fill="none" />

        {/* Small square accent */}
        <rect data-art="shape" x="380" y="145" width="30" height="30" fill="#0047FF" />

        {/* Intersection dots */}
        <circle data-art="dot" cx="300" cy="120" r="3" fill="#0047FF" />
        <circle data-art="dot" cx="520" cy="150" r="3" fill="#000000" />
        <circle data-art="dot" cx="800" cy="140" r="3" fill="#0047FF" />
        <circle data-art="dot" cx="1000" cy="160" r="3" fill="#000000" />
        <circle data-art="dot" cx="150" cy="180" r="3" fill="#000000" />

        {/* Cross marks */}
        <g data-art="shape" stroke="#0047FF" strokeWidth="1">
          <line x1="80" y1="80" x2="80" y2="100" />
          <line x1="70" y1="90" x2="90" y2="90" />
        </g>
        <g data-art="shape" stroke="#000000" strokeWidth="1">
          <line x1="1120" y1="240" x2="1120" y2="260" />
          <line x1="1110" y1="250" x2="1130" y2="250" />
        </g>
      </svg>
    </div>
  );
}