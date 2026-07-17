'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';

export default function GradientBackground() {
  const { theme } = useTheme();
  const glowRef = useRef(null);
  const target = useRef({ x: 50, y: 30 });
  const current = useRef({ x: 50, y: 30 });
  const frame = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    function setVars(x, y) {
      if (glowRef.current) {
        glowRef.current.style.setProperty('--glow-x', `${x}%`);
        glowRef.current.style.setProperty('--glow-y', `${y}%`);
      }
    }

    function handleMove(e) {
      target.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
    }

    function animate() {
      current.current.x += (target.current.x - current.current.x) * 0.04;
      current.current.y += (target.current.y - current.current.y) * 0.04;
      setVars(current.current.x, current.current.y);
      frame.current = requestAnimationFrame(animate);
    }

    function driftAmbient() {
      let t = 0;
      const step = () => {
        t += 0.002;
        const x = 50 + Math.sin(t) * 20;
        const y = 30 + Math.cos(t * 0.8) * 15;
        setVars(x, y);
        frame.current = requestAnimationFrame(step);
      };
      frame.current = requestAnimationFrame(step);
    }

    if (prefersReduced) {
      setVars(50, 30);
    } else if (isTouch) {
      driftAmbient();
    } else {
      window.addEventListener('mousemove', handleMove);
      frame.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ '--glow-x': '50%', '--glow-y': '30%' }}
    >
      {/* base surface */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{ backgroundColor: isDark ? '#0A0710' : '#FAF9FC' }}
      />

      {/* cursor/ambient-following glow */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(600px circle at var(--glow-x) var(--glow-y), rgba(107,63,212,0.28), transparent 70%)'
            : 'radial-gradient(600px circle at var(--glow-x) var(--glow-y), rgba(167,139,250,0.20), transparent 70%)',
        }}
      />

      {/* static ambient blobs for depth */}
      <div
        className="absolute -top-1/3 -right-1/4 h-[60vw] w-[60vw] rounded-full opacity-30 blur-3xl transition-colors duration-500"
        style={{ background: isDark ? '#6B3FD4' : '#C4B5FD' }}
      />
      <div
        className="absolute -bottom-1/3 -left-1/4 h-[50vw] w-[50vw] rounded-full opacity-20 blur-3xl transition-colors duration-500"
        style={{ background: isDark ? '#A78BFA' : '#DDD6FE' }}
      />
    </div>
  );
}