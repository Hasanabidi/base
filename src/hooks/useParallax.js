import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Returns a ref. The attached element parallaxes vertically as it scrolls
 * through the viewport. `speed` controls intensity (0.1 = subtle, 0.3 = strong).
 */
export function useParallax(speed = 0.15) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: speed * 100 },
        {
          y: -speed * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [speed]);

  return ref;
}