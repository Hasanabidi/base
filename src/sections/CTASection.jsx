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
      // Floating shapes parallax
      gsap.utils.toArray('[data-float]').forEach((el, i) => {
        gsap.to(el, {
          y: (i + 1) * 60 * (i % 2 === 0 ? 1 : -1),
          rotation: (i + 1) * 15,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={root} className="relative py-32 border-t border-black">
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="relative overflow-hidden border border-black bg-white px-8 py-20 text-center md:px-16 md:py-32">
          {/* Floating geometric shapes */}
          <div data-float className="pointer-events-none absolute -left-8 top-10 h-16 w-16 border border-accent" style={{ animation: 'float-shape 6s ease-in-out infinite' }} />
          <div data-float className="pointer-events-none absolute right-10 top-20 h-10 w-10 bg-accent/10 border border-accent" style={{ animation: 'float-shape 7s ease-in-out infinite 0.5s' }} />
          <div data-float className="pointer-events-none absolute -right-6 bottom-12 h-20 w-20 border border-black/20 rounded-full" style={{ animation: 'float-shape 8s ease-in-out infinite 1s' }} />
          <div data-float className="pointer-events-none absolute left-20 bottom-8 h-8 w-8 bg-accent/20" style={{ animation: 'float-shape 5s ease-in-out infinite 1.5s' }} />

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