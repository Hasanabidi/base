import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import { testimonials } from '@/data/testimonials';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="test-header"]', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      gsap.from('[data-anim="test-card"]', {
        opacity: 0, y: 20, stagger: 0.05, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const doubled = [...testimonials, ...testimonials];

  return (
    <section ref={root} className="relative overflow-hidden py-32 border-t border-black">
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div data-anim="test-header" className="mb-16 text-center">
          <div className="flex justify-center"><SectionLabel>Voices</SectionLabel></div>
          <h2 className="mt-6 font-heading text-section uppercase text-black">
            Trusted by <span className="text-accent">builders.</span>
          </h2>
        </div>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

        <div className="marquee-track flex gap-4 w-max">
          {doubled.map((t, i) => (
            <div key={i} data-anim="test-card" className="w-[420px] flex-shrink-0">
              <div className="hover-fill group border border-black bg-white p-8 h-full">
                <div className="hover-fill__layer" />
                <div className="relative z-10">
                <Quote size={24} className="text-accent mb-6 transition-colors duration-300 group-hover:text-white" />
                <p className="text-sm leading-relaxed text-black transition-colors duration-300 group-hover:text-white/90">"{t.quote}"</p>
                <div className="mt-6 flex items-center justify-between border-t border-black pt-4 transition-colors duration-300 group-hover:border-white/30">
                  <div>
                    <div className="text-sm font-heading font-bold text-black transition-colors duration-300 group-hover:text-white">{t.name}</div>
                    <div className="text-xs text-text-secondary transition-colors duration-300 group-hover:text-white/70">{t.role}, {t.company}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={10} className="fill-accent text-accent transition-colors duration-300 group-hover:fill-white group-hover:text-white" />
                    ))}
                  </div>
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