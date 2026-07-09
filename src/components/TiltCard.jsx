import { useRef, useState } from 'react';
import { cn } from '@/utils/cn';

export default function TiltCard({ children, className, maxTilt = 6 }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
  });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const tiltX = (0.5 - y) * maxTilt * 2;
    const tiltY = (x - 0.5) * maxTilt * 2;

    setStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`,
    });
    setGlarePos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    });
  };

  return (
    <div
      ref={ref}
      className={cn('relative transition-transform duration-300 ease-out', className)}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(199, 255, 58, 0.08) 0%, transparent 50%)`,
        }}
      />
      {children}
    </div>
  );
}