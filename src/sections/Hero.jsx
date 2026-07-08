import { useRef, useLayoutEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ParticleField = lazy(() => import('@/components/ParticleField'));

const headlineWords = ['Engineering', 'Leverage', 'from', 'Complexity.'];

export default function Hero() {
  const root = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) {
      gsap.set(root.current?.querySelectorAll('[data-anim]') || [], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('[data-anim="word"]', {
        yPercent: 110,
        opacity: 0,
        stagger: 0.1,
        duration: 1.0,
      })
        .from(
          '[data-anim="subhead"]',
          { y: 24, opacity: 0, duration: 0.8 },
          '-=0.4'
        )
        .from(
          '[data-anim="cta"]',
          { scale: 0.9, opacity: 0, stagger: 0.12, duration: 0.6 },
          '-=0.3'
        )
        .from(
          '[data-anim="scroll"]',
          { opacity: 0, duration: 0.6 },
          '-=0.2'
        )
        .from(
          '[data-anim="badge"]',
          { opacity: 0, y: 10, duration: 0.5 },
          '-=0.5'
        );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={root}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* WebGL Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="h-full w-full bg-core" />}>
          {!reducedMotion && <ParticleField />}
        </Suspense>
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-background/40 via-transparent to-background" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-background/20" />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-[1400px] px-6 text-center lg:px-10">
        <div
          data-anim="badge"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-text-secondary backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Full-Stack Digital Partner
        </div>

        <h1 className="font-heading text-hero text-white">
          {headlineWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span
                data-anim="word"
                className="inline-block"
                style={{ paddingBottom: '0.1em', marginBottom: '-0.1em' }}
              >
                {word}
                {i < headlineWords.length - 1 ? '\u00A0' : ''}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-anim="subhead"
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl"
        >
          AI Automation. Digital Systems. High Performance Software.{' '}
          <span className="text-white">Built to Scale.</span>
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div data-anim="cta">
            <MagneticButton to="/contact" variant="primary">
              Start Your Transformation
              <ArrowRight size={16} />
            </MagneticButton>
          </div>
          <div data-anim="cta">
            <MagneticButton to="/work" variant="secondary">
              View Our Work
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-anim="scroll"
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-text-secondary/60">
            Scroll
          </span>
          <ChevronDown size={16} className="animate-breathe text-accent" />
        </div>
      </div>
    </section>
  );
}