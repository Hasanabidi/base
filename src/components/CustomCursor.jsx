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
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      const target = e.target;
      if (target.closest('a, button, [data-cursor="hover"]')) {
        ring.classList.add('cursor-ring--active');
      } else {
        ring.classList.remove('cursor-ring--active');
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
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
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ marginLeft: '-3px', marginTop: '-3px' }}
      />
      <div
        ref={ringRef}
        className={cn(
          'cursor-ring pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 transition-[width,height,border-color,opacity] duration-300',
          'transition-all'
        )}
        style={{ marginLeft: '-20px', marginTop: '-20px' }}
      />
      <style>{`
        .cursor-ring--active {
          width: 56px !important;
          height: 56px !important;
          margin-left: -28px !important;
          margin-top: -28px !important;
          border-color: rgba(77, 235, 255, 0.8) !important;
          background: rgba(77, 235, 255, 0.05);
        }
      `}</style>
    </>
  );
}