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
    <section ref={root} className="relative py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-core/30 to-transparent" />
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div data-anim="stat-header" className="mb-20 text-center">
          <div className="flex justify-center"><SectionLabel>Impact</SectionLabel></div>
          <h2 className="mt-6 font-heading text-section text-white">
            Measurable results. <span className="text-text-secondary">Real leverage.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} data-anim="stat-item"
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center transition-all duration-500 hover:border-accent/20 hover:bg-accent/[0.02]">
              <div className="absolute left-1/2 top-0 h-px w-0 -translate-x-1/2 bg-accent transition-all duration-500 group-hover:w-12" />
              <div className="font-heading text-5xl font-medium text-white md:text-6xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-4 text-sm font-medium text-accent">{stat.label}</div>
              <div className="mt-1 text-xs text-text-secondary/60">{stat.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}