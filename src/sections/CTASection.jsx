import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const root = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="cta-line"]', {
        opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={root} className="relative py-32 border-t border-black">
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="relative overflow-hidden border border-black bg-white px-8 py-20 text-center md:px-16 md:py-32">
          <div className="grid-bg absolute inset-0 opacity-30" />

          <div data-anim="cta-line" className="mb-2 inline-flex items-center gap-2 border border-black px-4 py-2 text-xs uppercase tracking-[0.15em] font-heading font-bold text-black">
            <span className="h-1.5 w-1.5 bg-accent" />
            Ready to build
          </div>

          <h2 data-anim="cta-line" className="mt-8 font-heading text-display uppercase text-black">
            Let's engineer your
            <br />
            <span className="text-accent">next advantage.</span>
          </h2>

          <p data-anim="cta-line" className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-text-secondary">
            Book a strategy call. We'll map your systems, identify leverage points, and
            show you exactly where engineering can compound your results.
          </p>

          <div data-anim="cta-line" className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton to="/contact" variant="primary">
              Start Your Transformation
              <ArrowRight size={14} />
            </MagneticButton>
            <MagneticButton to="/work" variant="secondary">
              See the Work
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}