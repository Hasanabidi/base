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
        opacity: 0, y: 40, stagger: 0.15, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={root} className="relative py-40">
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-core/50 px-8 py-20 text-center md:px-16 md:py-32">
          {/* Glowing orb */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
          <div className="grid-bg absolute inset-0 opacity-20" />

          <div data-anim="cta-line" className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Ready to build
          </div>

          <h2 data-anim="cta-line" className="mt-8 font-heading text-display text-white">
            Let's engineer your
            <br />
            <span className="text-gradient-cyan">next advantage.</span>
          </h2>

          <p data-anim="cta-line" className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-text-secondary">
            Book a strategy call. We'll map your systems, identify leverage points, and
            show you exactly where engineering can compound your results.
          </p>

          <div data-anim="cta-line" className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton to="/contact" variant="primary">
              Start Your Transformation
              <ArrowRight size={16} />
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