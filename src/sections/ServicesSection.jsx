import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Code2, Palette, ArrowUpRight, Plus } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import TiltCard from '@/components/TiltCard';
import { services } from '@/data/services';

gsap.registerPlugin(ScrollTrigger);

const iconMap = { cpu: Cpu, code: Code2, palette: Palette };

export default function ServicesSection({ detailed = false }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="service-card"]', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      });
      gsap.from('[data-anim="service-header"]', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-32">
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div data-anim="service-header" className="mb-16 max-w-2xl">
          <SectionLabel>Services</SectionLabel>
          <h2 className="mt-6 font-heading text-section uppercase text-black">
            Three pillars.{' '}
            <span className="text-accent">One unified system.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            We don't build isolated solutions. Every engagement is engineered as an integrated
            system — where AI, software, and design compound each other's leverage.
          </p>
        </div>

        <div className="grid gap-0 md:grid-cols-3 border-t border-l border-black">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Cpu;
            const isFirst = i === 0;
            return (
              <div key={service.id} data-anim="service-card" className="border-b border-r border-black">
                <TiltCard
                  className={`group h-full p-8 transition-colors duration-300 ${isFirst ? 'bg-accent' : 'bg-white hover:bg-secondary-panel'}`}
                  maxTilt={2}
                >
                  <div className="relative mb-8 h-12 w-12">
                    <div className="flex h-12 w-12 items-center justify-center border border-black">
                      <Icon
                        size={20}
                        className={isFirst ? 'text-white' : 'text-accent'}
                      />
                    </div>
                  </div>

                  <span className={`font-mono text-xs ${isFirst ? 'text-white/60' : 'text-text-secondary/50'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-extrabold uppercase text-black">
                    {service.title}
                  </h3>
                  <p className={`mt-1 text-xs uppercase tracking-[0.15em] ${isFirst ? 'text-white' : 'text-accent'}`}>
                    {service.tagline}
                  </p>

                  <p className="mt-6 text-sm leading-relaxed text-text-secondary">
                    {service.description}
                  </p>

                  {detailed && (
                    <ul className="mt-6 space-y-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-text-secondary"
                        >
                          <Plus size={14} className="mt-1 flex-shrink-0 text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    to="/contact"
                    className="mt-8 inline-flex items-center gap-1 text-xs uppercase tracking-[0.15em] font-heading font-bold text-black transition-colors hover:text-accent"
                  >
                    Learn more
                    <ArrowUpRight size={14} />
                  </Link>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}