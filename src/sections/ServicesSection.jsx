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
        y: 60,
        rotateX: 8,
        scale: 0.95,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
        },
      });

      gsap.from('[data-anim="service-header"]', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-40">
      <div className="grid-bg absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div data-anim="service-header" className="mb-20 max-w-2xl">
          <SectionLabel>Services</SectionLabel>
          <h2 className="mt-6 font-heading text-section text-white">
            Three pillars.{' '}
            <span className="text-text-secondary">One unified system.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-text-secondary">
            We don't build isolated solutions. Every engagement is engineered as an integrated
            system — where AI, software, and design compound each other's leverage.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Cpu;
            return (
              <div key={service.id} data-anim="service-card">
                <TiltCard
                  className="group h-full rounded-2xl glass-panel glass-panel-hover p-8"
                  maxTilt={4}
                >
                  {/* Animated icon */}
                  <div className="relative mb-8 h-14 w-14">
                    <div className="absolute inset-0 rounded-xl bg-accent/10 transition-all duration-500 group-hover:bg-accent/20" />
                    <div className="relative flex h-14 w-14 items-center justify-center">
                      <Icon
                        size={24}
                        className="text-accent transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    {/* Animated line on hover */}
                    <div className="absolute -bottom-3 left-0 h-px w-0 bg-gradient-to-r from-accent to-transparent transition-all duration-500 group-hover:w-12" />
                  </div>

                  <span className="font-mono text-xs text-accent/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-medium text-white">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm text-accent/80">{service.tagline}</p>

                  <p className="mt-6 text-sm leading-relaxed text-text-secondary">
                    {service.description}
                  </p>

                  {detailed && (
                    <ul className="mt-6 space-y-3">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-text-secondary"
                        >
                          <Plus
                            size={14}
                            className="mt-1 flex-shrink-0 text-accent/60"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    to="/contact"
                    className="mt-8 inline-flex items-center gap-1 text-sm text-accent transition-colors hover:text-accent-glow"
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