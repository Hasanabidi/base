import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import AIWorkflowDiagram from '@/components/AIWorkflowDiagram';
import CosmicParticles from '@/components/CosmicParticles';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from '@/lib/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const headlineWords = ['Engineering', 'Leverage', 'from', 'Complexity.'];

export default function Hero() {
  const root = useRef(null);
  const headlineRef = useRef(null);
  const xrayRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();

  const handleHeadlineMove = (e) => {
    const wrap = headlineRef.current;
    const overlay = xrayRef.current;
    if (!wrap || !overlay) return;
    const rect = wrap.getBoundingClientRect();
    overlay.style.setProperty('--xray-x', `${e.clientX - rect.left}px`);
    overlay.style.setProperty('--xray-y', `${e.clientY - rect.top}px`);
    overlay.classList.add('is-active');
  };

  const handleHeadlineLeave = () => {
    xrayRef.current?.classList.remove('is-active');
  };

  const renderWords = (animated, wordClass) =>
    headlineWords.map((word, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom">
        <span
          {...(animated ? { 'data-anim': 'word' } : {})}
          className={`inline-block ${wordClass}`}
          style={{ paddingBottom: '0.1em', marginBottom: '-0.1em' }}
        >
          {word}
          {i < headlineWords.length - 1 ? '\u00A0' : ''}
        </span>
      </span>
    ));

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
          '[data-anim="art"]',
          { opacity: 0, y: 40, duration: 1 },
          '-=0.2'
        )
        .from(
          '[data-anim="scroll"]',
          { opacity: 0, duration: 0.6 },
          '-=0.3'
        )
        .from(
          '[data-anim="badge"]',
          { opacity: 0, y: 10, duration: 0.5 },
          '-=0.8'
        );
    }, root);

    // Scroll-driven: content fades & lifts, art parallaxes away
    if (!reducedMotion) {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
      scrollTl
        .to('[data-hero="text"]', { y: -80, opacity: 0.15, ease: 'none' }, 0)
        .to('[data-hero="grid"]', { y: 60, ease: 'none' }, 0);
    }

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={root}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Grid background */}
      <div data-hero="grid" className="absolute inset-0 bg-gradient-mesh" />
      <div className="grid-bg absolute inset-0 opacity-40" />

      {/* Curl-noise particle field */}
      {!reducedMotion && (
        <CosmicParticles theme={theme} className="absolute inset-0 z-10" />
      )}

      {/* Content */}
      <div data-hero="content" className="relative z-20 mx-auto max-w-[1400px] px-6 py-32 text-center lg:px-10">
        <div data-hero="text">
        <div
          data-anim="badge"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.15em] font-heading font-bold text-slate-900 shadow-soft"
        >
          <span className="h-1.5 w-1.5 bg-accent" />
          Full-Service Digital Agency
        </div>

        <div
          ref={headlineRef}
          onMouseMove={reducedMotion ? undefined : handleHeadlineMove}
          onMouseLeave={reducedMotion ? undefined : handleHeadlineLeave}
          className="relative"
        >
          <h1 className="font-heading text-hero font-extrabold uppercase text-black">
            {renderWords(true, 'text-gradient')}
          </h1>
          {!reducedMotion && (
            <div
              ref={xrayRef}
              aria-hidden="true"
              className="hero-xray pointer-events-none absolute inset-0 font-heading text-hero font-extrabold uppercase"
            >
              {renderWords(false, 'hero-xray-word')}
            </div>
          )}
        </div>

        <p
          data-anim="subhead"
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg"
        >
          Web development, mobile apps, SaaS platforms, POS software, financial services,
          and cybersecurity — all under one roof.{' '}
          <span className="text-black font-medium">Built to perform.</span>
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div data-anim="cta">
            <MagneticButton to="/contact" variant="primary">
              Start Your Transformation
              <ArrowRight size={14} />
            </MagneticButton>
          </div>
          <div data-anim="cta">
            <MagneticButton to="/work" variant="secondary">
              View Our Work
            </MagneticButton>
          </div>
        </div>
        </div>

        {/* AI workflow pipeline */}
        <div data-anim="art" data-hero="art" className="mx-auto mt-16 max-w-5xl">
          <AIWorkflowDiagram />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-anim="scroll"
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-text-secondary">
            Scroll
          </span>
          <ChevronDown size={16} className="animate-breathe text-accent" />
        </div>
      </div>
    </section>
  );
}