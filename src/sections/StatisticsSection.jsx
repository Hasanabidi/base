import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';
import AnimatedCounter from '@/components/AnimatedCounter';
import { stats } from '@/data/stats';

gsap.registerPlugin(ScrollTrigger);

export default function StatisticsSection() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="stat-header"]', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      gsap.from('[data-anim="stat-item"]', {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-32 border-t border-slate-200">
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div data-anim="stat-header" className="mb-16 text-center">
          <div className="flex justify-center"><SectionLabel>Impact</SectionLabel></div>
          <h2 className="mt-6 font-heading text-section uppercase text-black">
            Measurable results. <span className="text-gradient">Real leverage.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} data-anim="stat-item"
              className="hover-fill group relative rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-soft">
              <div className="hover-fill__layer" />
              <div className="relative z-10">
                <div className="font-heading text-5xl font-extrabold text-black transition-colors duration-300 group-hover:text-white md:text-6xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-4 text-xs uppercase tracking-[0.15em] font-heading font-bold text-accent transition-colors duration-300 group-hover:text-white">
                  {stat.label}
                </div>
                <div className="mt-1 text-xs text-text-secondary transition-colors duration-300 group-hover:text-white/70">
                  {stat.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}