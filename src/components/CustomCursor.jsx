import { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      const target = e.target;
      if (target.closest('a, button, [data-cursor="hover"]')) {
        ring.classList.add('cursor-ring--active');
      } else {
        ring.classList.remove('cursor-ring--active');
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.35;
      ringY += (mouseY - ringY) * 0.35;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ marginLeft: '-3px', marginTop: '-3px', willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={cn(
          'cursor-ring pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 rounded-full border border-accent/40 transition-[width,height,margin,border-color,background] duration-300 ease-out'
        )}
        style={{ marginLeft: '-16px', marginTop: '-16px', willChange: 'transform' }}
      />
      <style>{`
        .cursor-ring--active {
          width: 48px !important;
          height: 48px !important;
          margin-left: -24px !important;
          margin-top: -24px !important;
          border-color: rgba(99, 102, 241, 0.6) !important;
          background: rgba(99, 102, 241, 0.06);
        }
      `}</style>
    </>
  );
}