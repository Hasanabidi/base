import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import { testimonials } from '@/data/testimonials';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const root = useRef(null);
  const track = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="test-header"]', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      // Horizontal marquee
      const totalWidth = track.current?.scrollWidth / 2 || 0;
      gsap.to(track.current, {
        x: -totalWidth,
        ease: 'none',
        repeat: -1,
        duration: 40,
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const doubled = [...testimonials, ...testimonials];

  return (
    <section ref={root} className="relative overflow-hidden py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-core/20 to-transparent" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div data-anim="test-header" className="mb-20 text-center">
          <div className="flex justify-center"><SectionLabel>Voices</SectionLabel></div>
          <h2 className="mt-6 font-heading text-section text-white">
            Trusted by <span className="text-text-secondary">builders.</span>
          </h2>
        </div>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

        <div ref={track} className="flex gap-6 w-max">
          {doubled.map((t, i) => (
            <div key={i} className="w-[420px] flex-shrink-0">
              <div className="glass-panel glass-panel-hover rounded-2xl p-8 h-full">
                <Quote size={28} className="text-accent/30 mb-6" />
                <p className="text-sm leading-relaxed text-text-secondary">"{t.quote}"</p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-xs text-text-secondary/70">{t.role}, {t.company}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={12} className="fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}