import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useInView } from '@/hooks/useInView';

export default function AnimatedCounter({ value, suffix = '', duration = 2 }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const counterRef = useRef(null);

  useEffect(() => {
    if (!inView || !counterRef.current) return;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration,
      ease: 'power3.out',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(obj.val).toLocaleString() + suffix;
        }
      },
    });

    return () => tween.kill();
  }, [inView, value, suffix, duration]);

  return (
    <span ref={ref}>
      <span ref={counterRef}>0{suffix}</span>
    </span>
  );
}